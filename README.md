AXZOD

Axzod is powered by Axios and Zod. It provides a way of typing your request responses using the power of Zod.


Example

```
import {createAxzod} from 'axzod'
import {z} from 'zod'

const TodoSchema = z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    completed: z.boolean()
})

const instance = createAxzod({logging: true, baseURL: "https://jsonplaceholder.typicode.com"})


// Todo is now typed using the schema provided.
instance.get("/todos/1", TodoSchema).then(todo => console.log(todo.userId))
```


API

```
async get<T>(url: string, schema: z.ZodType<T>, config?: AxzodRequestConfig): Promise<T>
async delete<T>(url: string, schema: z.ZodType<T>, config?: AxzodRequestConfig): Promise<T>
async post<T>(url: string, schema: z.ZodType<T>, body?: any, config?: AxzodRequestConfig): Promise<T>
async put<T>(url: string, schema: z.ZodType<T>, body?: any, config?: AxzodRequestConfig): Promise<T>
async request<T>(config: AxzodRequestConfig, schema: z.ZodType<T>): Promise<T>

instance: AxiosInstance // The underlying AxiosInstance that Axzod is using. You can access this instance to modify the Axios instance yourself. This way you can add interceptors to your requests and responses.
```