export const sendEmail = async (AWS, params) => {
  const { toAddress, textBody, subject, sourceAddress } = params;

  const sesParams = {
    Destination: {
      ToAddresses: toAddress.split(",")
    },
    Message: {
      Body: {
        // Html: {
        // Charset: "UTF-8",
        // Data: htmlBody
        // },
        Text: {
          Charset: "UTF-8",
          Data: textBody
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject
      }
    },
    Source: sourceAddress
  };
  // console.log("sesParams", sesParams);

  // Create the promise and SES service object
  return await new AWS.SES({
    apiVersion: "2010-12-01",
    region: "us-east-1"
  })
    .sendEmail(sesParams)
    .promise();
};
