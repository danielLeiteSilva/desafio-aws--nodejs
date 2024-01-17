"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Alive_1 = __importDefault(require("./Controllers/Alive"));
const AssociateController_1 = __importDefault(require("./Controllers/AssociateController"));
const CategoryController_1 = __importDefault(require("./Controllers/CategoryController"));
const OwnerController_1 = __importDefault(require("./Controllers/OwnerController"));
const ProductController_1 = __importDefault(require("./Controllers/ProductController"));
const ownerController = new OwnerController_1.default();
const productController = new ProductController_1.default();
const categoryController = new CategoryController_1.default();
const associateController = new AssociateController_1.default();
router.get('/', Alive_1.default);
router.post('/api/v1/product', productController.register);
router.get('/api/v1/product/all', productController.listAll);
router.get('/api/v1/product/:id');
router.put('/api/v1/product/:id');
router.delete('/api/v1/product');
router.post('/api/v1/owner', ownerController.register);
router.get('/api/v1/owner/all', ownerController.listAll);
router.post('/api/v1/associate', associateController.register);
router.post('/api/v1/category', categoryController.register);
router.get('/api/v1/category/all', categoryController.listAll);
router.get('/api/v1/category/:id');
router.put('/api/v1/category/:id');
router.delete('/api/v1/category');
exports.default = router;
