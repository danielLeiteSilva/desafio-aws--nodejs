import { MongoClient } from "mongodb";

class MongoRepository{
  private client: MongoClient
  constructor() {
    this.client = new MongoClient(process.env.URI_MONGO || '')
  }

  private async connect(){
    return this.client.db(process.env.DB_NAME)
  }

  public async repository(collection: any){
    const db = await this.connect()
    return db.collection(collection)
  }
}

export default MongoRepository