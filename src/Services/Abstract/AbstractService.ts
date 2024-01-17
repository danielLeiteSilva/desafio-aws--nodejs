import MongoRepository from "../../DB/Mongo/MongoRepository"
import { ObjectId } from 'mongodb'

abstract class AbstractService {

  private client: MongoRepository
  private collection: string

  constructor(collection: any) {
    this.collection = collection
    this.client = new MongoRepository()
  }

  async connect(): Promise<any>{
    return await this.client.repository(this.collection)
  }

  async add(data: any): Promise<any> {
    const connect: any = await this.connect()
    const info = await connect.findOne(data)
    if (!info) {
      return await connect.insertOne(data)
    }
    return info
  }

  async find(query: object): Promise<any> {
    const connect: any = await this.connect()
    return await connect.findOne(query)
  }

  async get(id: string): Promise<any> {
    const connect: any = await this.connect()
    return await connect.findOne(new ObjectId(id))
  }

  async getAll(): Promise<any> {
    const connect: any = await this.connect()
    return await connect.find({}).toArray();
  }

  async update(id: ObjectId, query: object): Promise<any> {
    const connect: any = await this.connect()
    return await connect.updateOne({ _id: id }, { $set: query });
  }

  async delete(id: ObjectId): Promise<any> {
    const connect: any = await this.connect()
    return await connect.deleteOne({_id: id});
  }
  
} 

export default AbstractService