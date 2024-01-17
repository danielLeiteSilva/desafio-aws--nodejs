"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AssociateService_1 = __importDefault(require("../Services/AssociateService"));
const CategoryService_1 = __importDefault(require("../Services/CategoryService"));
const ProductService_1 = __importDefault(require("../Services/ProductService"));
class AssociateController {
    constructor() {
        this.update = (request, response) => __awaiter(this, void 0, void 0, function* () {
        });
        this.register = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield this.caregoryService.get(request.body.categoryID);
                if (!category) {
                    throw new Error('Essa categoria não está cadastrada. Cadastre uma categoria antes de associar');
                }
                const product = yield this.productService.get(request.body.productID);
                if (!product) {
                    throw new Error('Esse produto não está cadastrado. Cadastre um produto antes de associar');
                }
                const associate = yield this.associateService.add({
                    product: product,
                    category: category
                });
                if (associate) {
                    response.status(201).json(associate);
                }
            }
            catch (error) {
                response.status(400).json({ message: error.message });
            }
        });
        this.listAll = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const all = yield this.productService.getAll();
                response.status(201).json(all);
            }
            catch (error) {
                response.status(400).json({ message: error.message });
            }
        });
        this.caregoryService = new CategoryService_1.default();
        this.productService = new ProductService_1.default();
        this.associateService = new AssociateService_1.default();
    }
}
exports.default = AssociateController;
