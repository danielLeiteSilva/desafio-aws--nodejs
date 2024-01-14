const CategoryService = require("../Services/CategoryService")
const OwnerService = require("../Services/OwnerService")

class CategoryController {
  constructor() {
    this.caregoryService = new CategoryService()
    this.ownerService = new OwnerService()
  }

  registerCategory = async (request, response) => {
    try {
      const category = await this.ownerService.get(request.body.ownerID)
      if (!category) {
        throw new Error('Esse owner não existe. Cadastre um owner antes de cadastrar uma category')
      }
      const query = {
        title: request.body.title
      }
      const isCategory = await this.caregoryService.find(query)
      if (isCategory) {
        throw new Error('Essa categoria já existe. Cadastre outra categoria para continuar')
      }
      const product = await this.caregoryService.add(request.body)
      if (product) {
        response.status(201).json(product)
      }
    } catch (error) {
      response.status(400).json({
        message: error.message
      })
    }
  }

  listAllCategory = async (request, response) => {
    try {
      const all = await this.productService.getAll()
      response.status(201).json(all)
    } catch (error) {
      response.status(400).json({ message: error.message })
    }
  }
}

module.exports = CategoryController