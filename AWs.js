// Load the AWS SDK for Node.js
require('dotenv').config()
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS,
  region: process.env.REGION
});


let sqs = new AWS.SQS()

// var params = {
//   MessageAttributes: {
//     Title: {
//       DataType: "String",
//       StringValue: "The Whistler",
//     },
//     Author: {
//       DataType: "String",
//       StringValue: "John Grisham",
//     },
//     WeeksOn: {
//       DataType: "Number",
//       StringValue: "6",
//     },
//   },
//   MessageBody: "Test",
//   QueueUrl: "https://sqs.us-east-1.amazonaws.com/924977647785/marketplace",
// };

// sqs.sendMessage(params, function (err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data.MessageId);
//   }
// });



var queueURL = "https://sqs.us-east-1.amazonaws.com/924977647785/marketplace";

var params = {
  AttributeNames: ["SentTimestamp"],
  MaxNumberOfMessages: 10,
  MessageAttributeNames: ["All"],
  QueueUrl: queueURL,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0,
};

sqs.receiveMessage(params, function (err, data) {
  if (err) {
    console.log("Receive Error", err);
  } else if (data.Messages) {
    console.log(data.Messages)
    var deleteParams = {
      QueueUrl: queueURL,
      ReceiptHandle: data.Messages[0].ReceiptHandle,
    };
    sqs.deleteMessage(deleteParams, function (err, data) {
      if (err) {
        console.log("Delete Error", err);
      } else {
        console.log("Message Deleted", data);
      }
    });
  }
});