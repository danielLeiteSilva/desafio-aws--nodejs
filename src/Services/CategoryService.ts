import AbstractService from "./Abstract/AbstractService"

class CategoryService extends AbstractService {
  constructor() {
    super(process.env.CATEGORY_COLLECTION)
  }
}

export default CategoryService
