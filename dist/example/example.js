"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dist_1 = require("../dist");
const zod_1 = require("zod");
const TodoSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    id: zod_1.z.number(),
    title: zod_1.z.string(),
    completed: zod_1.z.boolean()
});
const instance = (0, dist_1.createAxzod)({ baseURL: "https://jsonplaceholder.typicode.com", logging: true });
instance.post("/todos/1", TodoSchema).then(data => {
    console.log(data);
}).catch(console.log);
