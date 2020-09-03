import * as express from "express";
import {Request, Response} from "express";
import {createConnection} from "typeorm";

import {getTodos, addTodo} from "./service";

createConnection().then(async (a) => {
    await a.runMigrations()

    const app = express();
    app.use(express.json());

    app.get("/todo/", async function(req: Request, res: Response) {
        const text = req.query?.text as string;
        const result = await getTodos(text);
        res.json(result);
    });

    app.post("/todo/", async function(req: Request, res: Response) {
        const text = req.body?.text as string;
        const userNames = req.body?.users as string[];
        const result = await addTodo(text, userNames);
        res.json(result);
    });

    app.listen(3000);
});
