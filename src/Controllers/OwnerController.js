const OwnerService = require("../Services/OwnerService");

class OwnerController {
  constructor() {
    this.ownerService = new OwnerService()
  }

  registerOwner = async (request, response) => {
    try {
      const owner = await this.ownerService.add(request.body)
      const query = {
        name: request.body.name
      }
      const isExistOwner = await this.ownerService.find(query)
      if(isExistOwner){
        throw new Error('Essa categoria já existe. Cadastre outra categoria para continuar')
      }
      if (owner) {
        response.status(201).json(owner)
      }
    } catch (error) {
      response.status(400).json({ message: error.message })
    }
  }

  listAllOwners = async (request, response) => {
    try {
      const all = await this.ownerService.getAll()
      response.status(201).json(all)
    } catch (error) {
      response.status(400).json({ message: error.message })
    }
  }
}

module.exports = OwnerController