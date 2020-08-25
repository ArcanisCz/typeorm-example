import * as express from "express";
import {Request, Response} from "express";
import {createConnection} from "typeorm";

// create typeorm connection
createConnection().then(connection => {
    const app = express();
    app.use(express.json());

    app.get("/", async function(req: Request, res: Response) {
        res.send("works");
    });

    // start express server
    app.listen(3000);
});
