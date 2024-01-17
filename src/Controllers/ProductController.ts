import ProductService from "../Services/ProductService"
import OwnerService from "../Services/OwnerService"
import Controller from "./Interface/InterfaceController"
import { ObjectId } from "mongodb"

class ProductController implements Controller {
  private productService: ProductService
  private ownerService: OwnerService
  constructor() {
    this.productService = new ProductService()
    this.ownerService = new OwnerService()
  }
  update = async (request: any, response: any): Promise<void> => {
    try {
      const id: ObjectId = new ObjectId(request.params.id)
      const isUpdate = this.productService.update(id, request.body)
      if(isUpdate){
        response.status(200).json(isUpdate)
      }
    } catch (error: any) {
      response.status(400).json({ message: error.message })
    }

  }
  register = async (request: any, response: any): Promise<void> => {
    try {
      const owner = await this.ownerService.get(request.body.ownerID)
      if (!owner) {
        throw new Error('Esse owner não existe. Cadastre um owner antes de cadastrar um produto')
      }

      const isProduct = await this.productService.find(request.body)
      if(isProduct){
        throw new Error('Esse produto já existe. Cadastre um novo para continuar')
      } 

      const product = await this.productService.add(request.body)
      if (product) {
        response.status(201).json(product)
      }
      
    } catch (error: any) {
      response.status(400).json({ message: error.message })
    }
  }
  listAll = async (request: any, response: any): Promise<void> => {
    console.log(typeof request)
    try {
      const all = await this.productService.getAll()
      response.status(201).json(all)
    } catch (error: any) {
      response.status(400).json({ message: error.message })
    }
  }
}

export default ProductController