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
const mongodb_1 = require("mongodb");
class ProductController {
    constructor() {
        this.delete = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = new mongodb_1.ObjectId(request.params.id);
                const isDelete = this.productService.delete(id);
                if (isDelete) {
                    response.status(200).json(isDelete);
                }
            }
            catch (error) {
                response.status(400).json({ message: error.message });
            }
        });
        this.update = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = new mongodb_1.ObjectId(request.params.id);
                const isUpdate = this.productService.update(id, request.body);
                if (isUpdate) {
                    response.status(200).json(isUpdate);
                }
            }
            catch (error) {
                response.status(400).json({ message: error.message });
            }
        });
        this.register = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const owner = yield this.ownerService.get(request.body.ownerID);
                if (!owner) {
                    throw new Error('Esse owner não existe. Cadastre um owner antes de cadastrar um produto');
                }
                const isProduct = yield this.productService.find(request.body);
                if (isProduct) {
                    throw new Error('Esse produto já existe. Cadastre um novo para continuar');
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
            console.log(typeof request);
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
