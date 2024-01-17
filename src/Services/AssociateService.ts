import AbstractService from "./Abstract/AbstractService"

class AssociateService extends AbstractService {
  constructor() {
    super(process.env.ASSOCIATE_COLLECTION)
  }
}

export default AssociateService
