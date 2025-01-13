import * as cdk from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const userPool = cognito.UserPool.fromUserPoolId(
      this,
      'ExistingUserPool',
      'us-east-2_m1pBRyoyM'  // Updated to your actual User Pool ID
    );

    const client = userPool.addClient('wavelength-web-client', {
      generateSecret: false,
      authFlows: {
        adminUserPassword: true,
        userPassword: true,
        userSrp: true
      }
    });
  }
}
