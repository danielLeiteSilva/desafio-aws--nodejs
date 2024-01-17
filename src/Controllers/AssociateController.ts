import { ObjectId } from "mongodb"
import AssociateService from "../Services/AssociateService"
import CategoryService from "../Services/CategoryService"
import ProductService from "../Services/ProductService"
import Controller from "./Interface/InterfaceController"

class AssociateController implements Controller {

  private categoryService: CategoryService
  private productService: ProductService
  private associateService: AssociateService

  constructor() {
    this.categoryService = new CategoryService()
    this.productService = new ProductService()
    this.associateService = new AssociateService()
  }

  delete = async (request: any, response: any): Promise<void> => {
    try {
      const id: ObjectId = new ObjectId(request.params.id)
      const isDelete = this.associateService.delete(id)
      if (isDelete) {
        response.status(200).json(isDelete)
      }
    } catch (error: any) {
      response.status(400).json({ message: error.message })
    }
  }

  update = async (request: any, response: any): Promise<void> => {
    try {
      const id: ObjectId = new ObjectId(request.params.id)
      const isUpdate = this.associateService.update(id, request.body)
      if (isUpdate) {
        response.status(200).json(isUpdate)
      }
    } catch (error: any) {
      response.status(400).json({ message: error.message })
    }
  }

  register = async (request: any, response: any): Promise<void> => {
    try {
      const category = await this.categoryService.get(request.body.categoryID)
      if (!category) {
        throw new Error('Essa categoria não está cadastrada. Cadastre uma categoria antes de associar')
      }
      const product = await this.productService.get(request.body.productID)
      if (!product) {
        throw new Error('Esse produto não está cadastrado. Cadastre um produto antes de associar')
      }

      const isAssociate = await this.associateService.find(request.body)
      if(isAssociate){
        throw new Error('Já existe uma associação deste produto com esse categoria')
      }

      const associate = await this.associateService.add({
        product: product,
        category: category
      })

      if (associate) {
        response.status(201).json(associate)
      }
    } catch (error: any) {
      response.status(400).json({ message: error.message })
    }
  }
  
  listAll = async (request: any, response: any): Promise<void> => {
    try {
      const all = await this.productService.getAll()
      response.status(201).json(all)
    } catch (error: any) {
      response.status(400).json({ message: error.message })
    }
  }
}

export default AssociateController