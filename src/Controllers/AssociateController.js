const AssociateService = require("../Services/AssociateService")
const CategoryService = require("../Services/CategoryService")
const ProductService = require("../Services/ProductService")

class AssociateController {
  constructor() {
    this.caregoryService = new CategoryService()
    this.productService = new ProductService()
    this.associateService = new AssociateService()
  }

  registerAssociate = async (request, response) => {
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
    } catch (error) {
      response.status(400).json({ message: error.message })
    }
  }

  listAllAssociates = async (request, response) => {
    try {
      const all = await this.productService.getAll()
      response.status(201).json(all)
    } catch (error) {
      response.status(400).json({ message: error.message })
    }
  }
}

module.exports = AssociateController