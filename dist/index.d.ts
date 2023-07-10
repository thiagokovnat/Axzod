import { AxiosInstance, CreateAxiosDefaults } from "axios";
import { z } from "zod";
export interface AxzodInstance {
    instance: AxiosInstance;
    get<T>(url: string, schema: z.ZodType<T>, headers?: {}): Promise<T>;
    delete<T>(url: string, schema: z.ZodType<T>, headers?: {}): Promise<T>;
    post<T>(url: string, schema: z.ZodType<T>, body?: {}, headers?: {}): Promise<T>;
    put<T>(url: string, schema: z.ZodType<T>, body?: {}, headers?: {}): Promise<T>;
}
export interface CreateAxzodDefaults extends CreateAxiosDefaults {
    logging?: boolean;
}
export declare const createAxzod: (config?: CreateAxzodDefaults) => AxzodInstance;
