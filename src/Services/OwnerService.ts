import AbstractService from "./Abstract/AbstractService"

class OwnerService extends AbstractService {
  constructor() {
    super(process.env.OWNER_COLLECTION)
  }
}

export default OwnerService
