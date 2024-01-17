import Controller from "./Interface/InterfaceController"

import CategoryService from "../Services/CategoryService"
import OwnerService from "../Services/OwnerService"
import { ObjectId } from "mongodb"

class CategoryController implements Controller {
  private categoryService: CategoryService
  private ownerService: OwnerService
  
  constructor() {
    this.categoryService = new CategoryService()
    this.ownerService = new OwnerService()
  }
  delete = async (request: any, response: any): Promise<void> => {
    try {
      const id: ObjectId = new ObjectId(request.params.id)
      const isDelete = this.categoryService.delete(id)
      if(isDelete){
        response.status(200).json(isDelete)
      }
    } catch (error: any) {
      response.status(400).json({ message: error.message })
    }
  }
  update = async (request: any, response: any): Promise<void> => {
    try {
      const id: ObjectId = new ObjectId(request.params.id)
      const isUpdate = this.categoryService.update(id, request.body)
      if (isUpdate) {
        response.status(200).json(isUpdate)
      }
    } catch (error: any) {
      response.status(400).json({ message: error.message })
    }
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