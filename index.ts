import axios, { AxiosHeaders, AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from "axios"
import {z} from "zod"
import {fromZodError} from 'zod-validation-error'

export interface AxzodInstance{
    instance: AxiosInstance;
    get<T>(url: string, schema: z.ZodType<T>, config?: AxzodRequestConfig): Promise<T>;
    delete<T>(url: string, schema: z.ZodType<T>, config?: AxzodRequestConfig): Promise<T>;
    post<T>(url: string, schema: z.ZodType<T>, body?: {}, config?: AxzodRequestConfig): Promise<T>;
    put<T>(url: string, schema: z.ZodType<T>, body?: {}, config?: AxzodRequestConfig): Promise<T>;
    request<T>(config: AxzodRequestConfig, schema: z.ZodType<T>): Promise<T>;
}

export interface CreateAxzodDefaults extends CreateAxiosDefaults{
    logging?: boolean;
}

export interface AxzodRequestConfig extends AxiosRequestConfig{}


class Axzod implements AxzodInstance{
    private axiosInstance: AxiosInstance;
    

    constructor(config?: CreateAxzodDefaults){
        this.axiosInstance = axios.create(config);
        if(config && config.logging){   
            this.axiosInstance.interceptors.response.use((response) => {
                const status = response.status;
                const request = response.config;
                const method = request.method?.toUpperCase();
                const url = (request.baseURL || "") + request.url
                console.debug(`[AXZOD]: HTTP ${method} ${url} ${status}`)
                return response
            }, (error) => {
                const status = error.response?.status;
                const request = error.config;
                const method = request.method?.toUpperCase();
                const url = (request.baseURL || "") + request.url
                console.error(`[AXZOD]: HTTP ${method} ${url} ${status}`)
                return Promise.reject(error)
            })
        }     
    }

    public get instance(): AxiosInstance{
        return this.axiosInstance;
    }

    public async get<T>(url: string, schema: z.ZodType<T>, config?: AxzodRequestConfig): Promise<T>{
        try {
           const response = await this.axiosInstance.get(url, config);
           const data = response.data;
           
           const responseParsed = schema.safeParse(data);
           if(!responseParsed.success){
                const error = fromZodError(responseParsed.error);
                return Promise.reject(error);
           }

           return responseParsed.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async delete<T>(url: string, schema: z.ZodType<T>, config?: AxzodRequestConfig): Promise<T>{
        try {
           const response = await this.axiosInstance.delete(url, config);
           const data = response.data;
           
           const responseParsed = schema.safeParse(data);
           if(!responseParsed.success){
                const error = fromZodError(responseParsed.error);
                return Promise.reject(error);
           }

           return responseParsed.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async post<T>(url: string, schema: z.ZodType<T>, body?: any, config?: AxzodRequestConfig): Promise<T>{
        try {
           const response = await this.axiosInstance.post(url, body, config);
           const data = response.data;
           
           const responseParsed = schema.safeParse(data);
           if(!responseParsed.success){
                const error = fromZodError(responseParsed.error);
                return Promise.reject(error);
           }

           return responseParsed.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async put<T>(url: string, schema: z.ZodType<T>, body?: any, config?: AxzodRequestConfig): Promise<T>{
        try {
           const response = await this.axiosInstance.put(url, body, config);
           const data = response.data;
           
           const responseParsed = schema.safeParse(data);
           if(!responseParsed.success){
                const error = fromZodError(responseParsed.error);
                return Promise.reject(error);
           }

           return responseParsed.data;
        } catch (error) {
            return Promise.reject(error);
        }
    } 

    public async request<T>(config: AxzodRequestConfig, schema: z.ZodType<T>): Promise<T>{
        try {
           const response = await this.axiosInstance.request(config);
           const data = response.data;
           
           const responseParsed = schema.safeParse(data);
           if(!responseParsed.success){
                const error = fromZodError(responseParsed.error);
                return Promise.reject(error);
           }

           return responseParsed.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}


export const createAxzod = (config?: CreateAxzodDefaults): AxzodInstance => {
    return new Axzod(config);
}

