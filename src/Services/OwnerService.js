const AbstractService = require("./AbstractService")

class OwnerService extends AbstractService {
  constructor() {
    super(process.env.OWNER_COLLECTION)
  }
}

module.exports = OwnerService
