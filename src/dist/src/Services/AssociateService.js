"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractService_1 = __importDefault(require("./Abstract/AbstractService"));
class AssociateService extends AbstractService_1.default {
    constructor() {
        super(process.env.ASSOCIATE_COLLECTION);
    }
}
exports.default = AssociateService;
