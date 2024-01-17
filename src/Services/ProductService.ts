import AbstractService from "./Abstract/AbstractService"

class ProductService extends AbstractService{
  constructor() {
    super(process.env.PRODUCT_COLLECTION)
  }
}

export default ProductService
