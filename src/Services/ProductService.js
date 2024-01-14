const AbstractService = require("./AbstractService")

class ProductService extends AbstractService{
  constructor() {
    super(process.env.PRODUCT_COLLECTION)
  }
}

module.exports = ProductService
