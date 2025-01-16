import * as cdk from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create User Pool
    const userPool = new cognito.UserPool(this, 'PostsUserPool', {
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
      },
    });

    // Create User Pool Client
    const userPoolClient = new cognito.UserPoolClient(this, 'PostsUserPoolClient', {
      userPool,
      generateSecret: false,
      oAuth: {
        flows: {
          implicitCodeGrant: true,
        },
      },
    });

    // Create Identity Pool
    const identityPool = new cognito.CfnIdentityPool(this, 'PostsIdentityPool', {
      allowUnauthenticatedIdentities: false,
      cognitoIdentityProviders: [{
        clientId: userPoolClient.userPoolClientId,
        providerName: userPool.userPoolProviderName,
      }],
    });

    // Create DynamoDB Table
    const postsTable = new dynamodb.Table(this, 'PostsTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // For development only
    });

    // Create AppSync API
    const api = new appsync.GraphqlApi(this, 'PostsApi', {
      name: 'posts-api',
      schema: appsync.SchemaFile.fromAsset('graphql/schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool,
          },
        },
      },
    });

    // Create Lambda Function
    const lambdaFunction = new lambda.Function(this, 'MyFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'lambda/dynamodb/index.handler',
      code: lambda.Code.fromAsset('lambda/dynamodb'),
      environment: {
        POSTS_TABLE: postsTable.tableName,
      },
    });

    // Create Lambda Data Source
    const lambdaDataSource = api.addLambdaDataSource('PostsLambdaDataSource', lambdaFunction);

    // Create Resolvers
    lambdaDataSource.createResolver('QueryGetPosts', {
      typeName: 'Query',
      fieldName: 'getPosts',
    });

    lambdaDataSource.createResolver('MutationCreatePost', {
      typeName: 'Mutation',
      fieldName: 'createPost',
    });

    lambdaDataSource.createResolver('MutationUpdatePost', {
      typeName: 'Mutation',
      fieldName: 'updatePost',
    });

    lambdaDataSource.createResolver('MutationDeletePost', {
      typeName: 'Mutation',
      fieldName: 'deletePost',
    });

    // Grant Lambda permissions to DynamoDB
    postsTable.grantReadWriteData(lambdaFunction);

    // Create Lambda Execution Role
    const lambdaExecutionRole = new iam.Role(this, 'MyFunctionExecutionRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });

    // Attach managed policies to the Lambda role
    lambdaExecutionRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'));
    lambdaExecutionRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'));
    lambdaExecutionRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AWSAppSyncInvokeFullAccess'));

    // Create Authenticated Role for Cognito
    const authenticatedRole = new iam.Role(this, 'AuthenticatedRole', {
      assumedBy: new iam.FederatedPrincipal(
        'cognito-identity.amazonaws.com',
        {
          StringEquals: {
            'cognito-identity.amazonaws.com:aud': identityPool.ref,
          },
          'ForAnyValue:StringLike': {
            'cognito-identity.amazonaws.com:amr': 'authenticated',
          },
        },
        'sts:AssumeRoleWithWebIdentity'
      ),
    });

    // Attach managed policy to the Authenticated Role
    authenticatedRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonCognitoPowerUser'));

    // Attach AppSync permissions to the Authenticated Role
    authenticatedRole.addToPolicy(new iam.PolicyStatement({
      actions: ["appsync:GraphQL"],
      resources: [
        `arn:aws:appsync:${this.region}:${this.account}:apis/${api.apiId}/types/Query/*`,
        `arn:aws:appsync:${this.region}:${this.account}:apis/${api.apiId}/types/Mutation/*`
      ],
    }));

    // Create AppSync Data Source Role
    const dataSourceRole = new iam.Role(this, 'PostsLambdaDataSourceRole', {
      assumedBy: new iam.ServicePrincipal('appsync.amazonaws.com'),
    });

    // Attach Lambda invoke permissions to the AppSync Data Source Role
    dataSourceRole.addToPolicy(new iam.PolicyStatement({
      actions: ["lambda:InvokeFunction"],
      resources: [lambdaFunction.functionArn],
    }));

    // Output values
    new cdk.CfnOutput(this, 'GraphQLApiUrl', { value: api.graphqlUrl });
    new cdk.CfnOutput(this, 'UserPoolId', { value: userPool.userPoolId });
    new cdk.CfnOutput(this, 'UserPoolClientId', { value: userPoolClient.userPoolClientId });
    new cdk.CfnOutput(this, 'IdentityPoolId', { value: identityPool.ref });
  }
}
