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
const ProductService_1 = __importDefault(require("../Services/ProductService"));
const OwnerService_1 = __importDefault(require("../Services/OwnerService"));
class ProductController {
    constructor() {
        this.register = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const owner = yield this.ownerService.get(request.body.ownerID);
                if (!owner) {
                    throw new Error('Esse owner não existe. Cadastre um owner antes de cadastrar um produto');
                }
                const product = yield this.productService.add(request.body);
                if (product) {
                    response.status(201).json(product);
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
        this.productService = new ProductService_1.default();
        this.ownerService = new OwnerService_1.default();
    }
}
exports.default = ProductController;
