import Controller from "./Interface/InterfaceController"

import CategoryService from "../Services/CategoryService"
import OwnerService from "../Services/OwnerService"

class CategoryController implements Controller {
  private categoryService: CategoryService
  private ownerService: OwnerService
  constructor() {
    this.categoryService = new CategoryService()
    this.ownerService = new OwnerService()
  }
  update = async (request: any, response: any): Promise<void> => {
    
  }
  register = async (request: any, response: any): Promise<void> => {
    try {
      const category = await this.ownerService.get(request.body.ownerID)
      if (!category) {
        throw new Error('Esse owner não existe. Cadastre um owner antes de cadastrar uma category')
      }
      const query = {
        title: request.body.title
      }
      const isCategory = await this.categoryService.find(query)
      if (isCategory) {
        throw new Error('Essa categoria já existe. Cadastre outra categoria para continuar')
      }
      const product = await this.categoryService.add(request.body)
      if (product) {
        response.status(201).json(product)
      }
    } catch (error: any) {
      response.status(400).json({
        message: error.message
      })
    }
  }
  listAll = async (request: any, response: any): Promise<void> => {
    try {
      const all = await this.categoryService.getAll()
      response.status(201).json(all)
    } catch (error: any) {
      response.status(400).json({ message: error.message })
    }
  }
}

export default CategoryController