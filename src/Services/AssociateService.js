const AbstractService = require("./AbstractService")

class AssociateService extends AbstractService {
  constructor() {
    super(process.env.ASSOCIATE_COLLECTION)
  }
}

module.exports = AssociateService
