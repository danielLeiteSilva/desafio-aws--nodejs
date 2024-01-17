import OwnerService from "../Services/OwnerService"
import Controller from "./Interface/InterfaceController"

class OwnerController implements Controller {

  private ownerService: OwnerService

  constructor() {
    this.ownerService = new OwnerService()
  }
  update = async (request: any, response: any): Promise<void> => {
    
  }
  register = async (request: any, response: any): Promise<void> => {
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
    } catch (error: any) {
      response.status(400).json({ message: error.message })
    }
  }
  listAll = async (request: any, response: any): Promise<void> => {
    try {
      const all = await this.ownerService.getAll()
      response.status(201).json(all)
    } catch (error: any) {
      response.status(400).json({ message: error.message })
    }
  }
}

export default OwnerController