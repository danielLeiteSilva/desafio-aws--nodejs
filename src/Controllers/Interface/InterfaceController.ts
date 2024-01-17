interface Controller{
  register(request: any, response: any): Promise<void>
  listAll(request: any, response: any): Promise<void>
  update(request: any, response: any): Promise<void>
}

export default Controller