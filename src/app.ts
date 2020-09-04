import * as express from "express";
import {Request, Response} from "express";
import {createConnection} from "typeorm";
import {String, Record, Static} from "runtypes";
import {configure, getLogger} from "log4js";
import {string, object} from "joi";

import {getTodos, addTodo} from "./service";

const TodoFilterChecker = Record({
    text: String,
    text1: String,
});
type TodoFilter = Static<typeof TodoFilterChecker>;

configure({
    appenders: {
        everything:{ type: "stdout"  },
    },
    categories: {
        default: {
            appenders: [ "everything"], level: "all"},
    }
});

const LOGGER = getLogger("app");

createConnection().then(async (a) => {
    // await a.runMigrations();

    const app = express();
    app.use(express.json());

    const aaa = object({
        aa: string().required(),
        bb: string().required(),
    });

    const {error, value} = aaa.validate({aa: "dasdas", bb: "ddd", cc: "ccc"}, {abortEarly: false});
    LOGGER.error(error);
    LOGGER.debug(value);

    app.get("/todo/", async function (req: Request<any, any, any, TodoFilter>, res: Response) {
        const b = TodoFilterChecker.validate(req.query);
        if (b.success === false) {
            res.status(401).send(b);
        } else {
            const result = await getTodos(b.value.text);
            res.json(result);
        }
    });

    app.post("/todo/", async function (req: Request, res: Response) {
        const text = req.body?.text as string;
        const userNames = req.body?.users as string[];
        const result = await addTodo(text, userNames);
        res.json(result);
    });

    app.listen(3000);
});
