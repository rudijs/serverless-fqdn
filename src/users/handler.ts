import cuuid from "cuuid";

export const hello = async (event: any) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: cuuid()
      // input: event
    })
  };
};
