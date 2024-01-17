import express, { Router } from'express'
const router: Router = express.Router()

import Alive from './Controllers/Alive'
import AssociateController from './Controllers/AssociateController'
import CategoryController from './Controllers/CategoryController'

import OwnerController from './Controllers/OwnerController'
import ProductController from './Controllers/ProductController'

const ownerController: OwnerController = new OwnerController()
const productController: ProductController = new ProductController()
const categoryController: CategoryController = new CategoryController()
const associateController: AssociateController = new AssociateController()

router.get('/', Alive)

router.post('/api/v1/product', productController.register)
router.get('/api/v1/product/all', productController.listAll)
router.get('/api/v1/product/:id')
router.put('/api/v1/product/:id', productController.update)
router.delete('/api/v1/product/:id', productController.delete)

router.post('/api/v1/owner', ownerController.register)
router.get('/api/v1/owner/all', ownerController.listAll)

router.post('/api/v1/associate', associateController.register)

router.post('/api/v1/category', categoryController.register)
router.get('/api/v1/category/all', categoryController.listAll)
router.get('/api/v1/category/:id')
router.put('/api/v1/category/:id', categoryController.update)
router.delete('/api/v1/category/:id', categoryController.delete)

export default router