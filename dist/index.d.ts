import { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from "axios";
import { z } from "zod";
export interface AxzodInstance {
    instance: AxiosInstance;
    get<T>(url: string, schema: z.ZodType<T>, config?: AxzodRequestConfig): Promise<T>;
    delete<T>(url: string, schema: z.ZodType<T>, config?: AxzodRequestConfig): Promise<T>;
    post<T>(url: string, schema: z.ZodType<T>, body?: {}, config?: AxzodRequestConfig): Promise<T>;
    put<T>(url: string, schema: z.ZodType<T>, body?: {}, config?: AxzodRequestConfig): Promise<T>;
    request<T>(config: AxzodRequestConfig, schema: z.ZodType<T>): Promise<T>;
}
export interface CreateAxzodDefaults extends CreateAxiosDefaults {
    logging?: boolean;
}
export interface AxzodRequestConfig extends AxiosRequestConfig {
}
export declare const createAxzod: (config?: CreateAxzodDefaults) => AxzodInstance;
