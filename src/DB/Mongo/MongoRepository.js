require('dotenv').config()
const { MongoClient } = require('mongodb')
class MongoRepository{
  constructor() {
    this.client = new MongoClient(process.env.URI_MONGO);
  }

  async connect(){
    return this.client.db(process.env.DB_NAME)
  }

  async repository(collection){
    const db = await this.connect()
    return db.collection(collection)
  }
}

module.exports = MongoRepository