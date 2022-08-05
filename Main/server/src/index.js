"use strict";
// src/app.ts
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
// 引入koa
const koa_1 = __importDefault(require("koa"));
const http_1 = __importDefault(require("http"));
// 创建koa实例
const app = new koa_1.default();
// 创建服务器
const server = new http_1.default.Server(app.callback());
// 中间件
app.use((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.body = 'Hello World';
}));
// 监听端口
app.listen(9000, () => {
    console.log('run success');
    console.log('app started at port 9000...');
});
