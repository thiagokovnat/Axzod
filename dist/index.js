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
exports.createAxzod = void 0;
const axios_1 = __importDefault(require("axios"));
const zod_validation_error_1 = require("zod-validation-error");
class Axzod {
    constructor(config) {
        this.axiosInstance = axios_1.default.create(config);
        if (config && config.logging) {
            this.axiosInstance.interceptors.response.use((response) => {
                var _a;
                const status = response.status;
                const request = response.config;
                const method = (_a = request.method) === null || _a === void 0 ? void 0 : _a.toUpperCase();
                const url = (request.baseURL || "") + request.url;
                console.debug(`[AXZOD]: HTTP ${method} ${url} ${status}`);
                return response;
            }, (error) => {
                var _a, _b;
                const status = (_a = error.response) === null || _a === void 0 ? void 0 : _a.status;
                const request = error.config;
                const method = (_b = request.method) === null || _b === void 0 ? void 0 : _b.toUpperCase();
                const url = (request.baseURL || "") + request.url;
                console.error(`[AXZOD]: HTTP ${method} ${url} ${status}`);
                return Promise.reject(error);
            });
        }
    }
    get instance() {
        return this.axiosInstance;
    }
    get(url, schema, config) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axiosInstance.get(url, config);
                const data = response.data;
                const responseParsed = schema.safeParse(data);
                if (!responseParsed.success) {
                    const error = (0, zod_validation_error_1.fromZodError)(responseParsed.error);
                    return Promise.reject(error);
                }
                return responseParsed.data;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    delete(url, schema, config) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axiosInstance.delete(url, config);
                const data = response.data;
                const responseParsed = schema.safeParse(data);
                if (!responseParsed.success) {
                    const error = (0, zod_validation_error_1.fromZodError)(responseParsed.error);
                    return Promise.reject(error);
                }
                return responseParsed.data;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    post(url, schema, body, config) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axiosInstance.post(url, body, config);
                const data = response.data;
                const responseParsed = schema.safeParse(data);
                if (!responseParsed.success) {
                    const error = (0, zod_validation_error_1.fromZodError)(responseParsed.error);
                    return Promise.reject(error);
                }
                return responseParsed.data;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    put(url, schema, body, config) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axiosInstance.put(url, body, config);
                const data = response.data;
                const responseParsed = schema.safeParse(data);
                if (!responseParsed.success) {
                    const error = (0, zod_validation_error_1.fromZodError)(responseParsed.error);
                    return Promise.reject(error);
                }
                return responseParsed.data;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    request(config, schema) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axiosInstance.request(config);
                const data = response.data;
                const responseParsed = schema.safeParse(data);
                if (!responseParsed.success) {
                    const error = (0, zod_validation_error_1.fromZodError)(responseParsed.error);
                    return Promise.reject(error);
                }
                return responseParsed.data;
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
}
const createAxzod = (config) => {
    return new Axzod(config);
};
exports.createAxzod = createAxzod;
