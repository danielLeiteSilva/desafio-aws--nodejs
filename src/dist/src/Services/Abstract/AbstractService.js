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
const MongoRepository_1 = __importDefault(require("../../DB/Mongo/MongoRepository"));
const mongodb_1 = require("mongodb");
class AbstractService {
    constructor(collection) {
        this.collection = collection;
        this.client = new MongoRepository_1.default();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.repository(this.collection);
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const connect = yield this.connect();
            const info = yield connect.findOne(data);
            if (!info) {
                return yield connect.insertOne(data);
            }
            return info;
        });
    }
    find(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const connect = yield this.connect();
            return yield connect.findOne(query);
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connect = yield this.connect();
            return yield connect.findOne(new mongodb_1.ObjectId(id));
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const connect = yield this.connect();
            return yield connect.find({}).toArray();
        });
    }
    update(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const connect = yield this.connect();
            return yield connect.updateOne({ _id: id }, { $set: query });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connect = yield this.connect();
            return yield connect.deleteOne({ _id: id });
        });
    }
}
exports.default = AbstractService;
