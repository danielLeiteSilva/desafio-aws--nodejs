interface Model {
  DataType: String,
  StringValue: String,
}

interface Title extends Model { }
interface Author extends Model { }
interface WeeksOn extends Model { }

export default interface MessageAttributes {
  Title: Title,
  Author: Author,
  WeeksOn: WeeksOn,
  MessageBody: String
  QueueUrl: String
}