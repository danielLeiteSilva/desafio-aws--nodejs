const AbstractService = require("./AbstractService")

class CategoryService extends AbstractService {
  constructor() {
    super(process.env.CATEGORY_COLLECTION)
  }
}

module.exports = CategoryService
