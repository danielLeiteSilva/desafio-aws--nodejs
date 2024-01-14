const ProductService = require("../Services/ProductService")
const OwnerService = require("../Services/OwnerService")

class ProductController{
  constructor(){
    this.productService = new ProductService()
    this.ownerService = new OwnerService()
  }

  registerProduct = async (request, response) => {
    try {
      const owner = await this.ownerService.get(request.body.ownerID)
      if(!owner){
        throw new Error('Esse owner não existe. Cadastre um owner antes de cadastrar um produto')
      }
      const product = await this.productService.add(request.body)
      if (product) {
        response.status(201).json(product)
      }
    } catch (error) {
      response.status(400).json({ message: error.message })
    }
  }

  listAllProducts = async (request, response) => {
    try {
      const all = await this.productService.getAll()
      response.status(201).json(all)
    } catch (error) {
      response.status(400).json({ message: error.message })
    }
  }
}

module.exports = ProductController