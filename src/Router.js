const Alive = require('./Controllers/Alive')
const AssociateController = require('./Controllers/AssociateController')
const CategoryController = require('./Controllers/CategoryController')
const Router = require('express').Router()

const OwnerController = require('./Controllers/OwnerController')
const ProductController = require('./Controllers/ProductController')

const { registerOwner, listAllOwners } = new OwnerController()
const { registerProduct, listAllProducts } = new ProductController()
const { registerCategory, listAllCategory} = new CategoryController()
const { registerAssociate, listAllAssociates} = new AssociateController()

Router.get('/', Alive)

Router.post('/api/v1/product', registerProduct)
Router.get('/api/v1/product/all', listAllProducts)
Router.get('/api/v1/product/:id')
Router.put('/api/v1/product/:id')
Router.delete('/api/v1/product')

Router.post('/api/v1/owner', registerOwner)
Router.get('/api/v1/owner/all', listAllOwners)

Router.post('/api/v1/associate', registerAssociate)

Router.post('/api/v1/category', registerCategory)
Router.get('/api/v1/category/all', listAllCategory)
Router.get('/api/v1/category/:id')
Router.put('/api/v1/category/:id')
Router.delete('/api/v1/category')



module.exports = Router