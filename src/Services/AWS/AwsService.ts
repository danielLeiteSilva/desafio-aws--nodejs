import sqs from "aws-sdk/clients/sqs";
import MessageAttributes from "../../Model/MessageAttributes";
import AwsConfig from "./AwsConfig";

class AwsSqsService extends AwsConfig {

  private readonly aws: any

  constructor() {
    super()
    this.aws = new this.awsConfig.SQS()
  }

  sendMessageToQueue(message: MessageAttributes) {
    return new Promise((resolve, reject) => {
      this.aws.sendMessage({ message }, function (err: any, data: any) {
        if (err) {
          console.log("Error", err)
          reject(err)
        } else {
          console.log("Success", data.MessageId)
          resolve(data.MessageId)
        }
      });
    })
  }
}


export default AwsSqsService





// var queueURL = "https://sqs.us-east-1.amazonaws.com/924977647785/marketplace";

// var params = {
//   AttributeNames: ["SentTimestamp"],
//   MaxNumberOfMessages: 10,
//   MessageAttributeNames: ["All"],
//   QueueUrl: queueURL,
//   VisibilityTimeout: 20,
//   WaitTimeSeconds: 0,
// };

// sqs.receiveMessage(params, function (err, data) {
//   if (err) {
//     console.log("Receive Error", err);
//   } else if (data.Messages) {
//     console.log(data.Messages)
//     var deleteParams = {
//       QueueUrl: queueURL,
//       ReceiptHandle: data.Messages[0].ReceiptHandle,
//     };
//     sqs.deleteMessage(deleteParams, function (err, data) {
//       if (err) {
//         console.log("Delete Error", err);
//       } else {
//         console.log("Message Deleted", data);
//       }
//     });
//   }
// });