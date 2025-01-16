export const handler = async (event) => {
  try {
    // Your getPosts logic here
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: {
          getPosts: [] // Your posts data
        }
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };
  }
}; 