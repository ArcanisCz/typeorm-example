import * as express from "express";
import {Request, Response} from "express";
import {createConnection, Repository, In} from "typeorm";

import {Todo} from "./entity/Todo";
import {User} from "./entity/User";

// create typeorm connection
createConnection().then(connection => {
    const app = express();
    app.use(express.json());

    app.get("/todo/", async function(req: Request, res: Response) {
        const todosRepo: Repository<Todo> = connection.getRepository(Todo);
        const usersRepo: Repository<Todo> = connection.getRepository(Todo);
        const query = req.query?.text;
        if(query){
            const todos = await todosRepo.find({where: {text: query}});
            res.json(todos);
        }else {
            const todos = await todosRepo.find();
            res.json(todos);
        }
    });

    app.post("/todo/", async function(req: Request, res: Response) {
        connection.manager.transaction(async (tManager) => {
            const todosRepo: Repository<Todo> = tManager.getRepository(Todo);
            const usersRepo: Repository<User> = tManager.getRepository(User);

            const users = req.body?.users;
            if(users){
                const todo = new Todo();
                todo.text = req.body.text;
                const userEntities = await usersRepo.find({where: {firstName: In(users)}})

                const dbUserNames = userEntities
                    .map((entity) => entity.firstName);
                const toSave = users
                    .filter((firstName) => !dbUserNames.includes(firstName))
                    .map((firstName) => {
                        const userEntity = new User();
                        userEntity.firstName = firstName;
                        userEntity.lastName = "unknown";
                        return userEntity;
                    })


                const savedEntities: User[] = await Promise.all(
                    toSave.map(async (entity) => await usersRepo.save(entity))
                );

                todo.user = [...userEntities, ...savedEntities];

                const saved = await todosRepo.save(todo);

                res.json(saved);
            }else {
                const todo = new Todo();
                todo.text = req.body.text;
                const saved = await todosRepo.save(todo);
                res.json(saved);
            }
        })
    });

    // start express server
    app.listen(3000);
});
