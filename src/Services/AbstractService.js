const MongoRepository = require("../DB/Mongo/MongoRepository")
const { ObjectId } = require('mongodb')

class AbstractService {
  constructor(collection) {
    this.collection = collection
    this.client = new MongoRepository()
  }

  async connect() {
    return await this.client.repository(this.collection)
  }

  async add(data) {
    const connect = await this.connect()
    const info = await connect.findOne(data)
    if (!info) {
      return await connect.insertOne(data)
    }
    return info
  }

  async find(query) {
    const connect = await this.connect()
    return await connect.findOne(query)
  }

  async get(id) {
    const connect = await this.connect()
    return await connect.findOne(new ObjectId(id))
  }

  async getAll() {
    const connect = await this.connect()
    return await connect.find({}).toArray();
  }
}

module.exports = AbstractService