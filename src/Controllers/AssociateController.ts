import AssociateService from "../Services/AssociateService"
import CategoryService from "../Services/CategoryService"
import ProductService from "../Services/ProductService"
import Controller from "./Interface/InterfaceController"

class AssociateController implements Controller {

  private caregoryService: CategoryService
  private productService: ProductService
  private associateService: AssociateService

  constructor() {
    this.caregoryService = new CategoryService()
    this.productService = new ProductService()
    this.associateService = new AssociateService()
  }
  update = async (request: any, response: any): Promise<void> => {
    
  }

  register = async (request: any, response: any): Promise<void> => {
    try {
      const category = await this.caregoryService.get(request.body.categoryID)
      if (!category) {
        throw new Error('Essa categoria não está cadastrada. Cadastre uma categoria antes de associar')
      }
      const product = await this.productService.get(request.body.productID)
      if (!product) {
        throw new Error('Esse produto não está cadastrado. Cadastre um produto antes de associar')
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