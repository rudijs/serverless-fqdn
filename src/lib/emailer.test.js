import * as assert from "assert";
import { sendEmail } from "./emailer";

describe.only("emailer", () => {
  const params = {
    toAddress: "toAddress1@test.com,toAddress2@test.com",
    textBody: "Sample text message body",
    subject: "Email Alert",
    sourceAddress: "Alert Bot from IT Department <sourceAddress@test.com>"
  };

  it("#send() should return an AWS.Request success object", async () => {
    // AWS.Request success response
    const awsRequestSuccess = {
      ResponseMetadata: { RequestId: "7b150fd0-453d-11e9-8cd1-b3498efa3c73" },
      MessageId: "0100016975072846-75e69eca-4fdd-4603-b206-3751b956e7a4-000000"
    };

    const AWS = {
      SES: class {
        constructor(params) {
          // console.log(200, params);
        }
        sendEmail(params) {
          // console.log(201, params);
          return {
            promise: () => {
              return Promise.resolve(awsRequestSuccess);
            }
          };
        }
      }
    };

    try {
      const res = await sendEmail(AWS, params);
      assert.ok(res.ResponseMetadata.RequestId);
      assert.ok(res.MessageId);
    } catch (e) {
      console.log(e);
      throw Error("Should not throw this error");
    }
  });

  it("#send() should handle errors and return and AWS.Request error object", async () => {
    // AWS.Request error response
    const awsRequestError = {
      message:
        "User `arn:aws:sts::205565617391:assumed-role/tasks-dev-ap-southeast-1-lambdaRole/tasks-dev-hello' is not authorized to perform `ses:SendEmail' on resource `arn:aws:ses:us-east-1:205565617391:identity/oolyx.me@gmail.com'",
      code: "AccessDenied",
      time: "2019-03-13T03:16:07.688Z",
      requestId: "57c1fa99-453e-11e9-946c-4fb0c630972c",
      statusCode: 403,
      retryable: false,
      retryDelay: 43.95173244434763
    };

    const AWS = {
      SES: class {
        constructor(params) {
          // console.log(200, params);
        }
        sendEmail(params) {
          // console.log(201, params);
          return {
            promise: () => {
              return Promise.reject(awsRequestError);
            }
          };
        }
      }
    };

    try {
      const res = await sendEmail(AWS, params);
    } catch (e) {
      assert.ok(e.message);
      assert.ok(e.code);
      assert.ok(e.statusCode);
      assert.ok(e.requestId);
    }
  });
});
