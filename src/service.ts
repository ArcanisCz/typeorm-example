import {getConnection, Repository, In} from "typeorm";
import {getLogger} from "log4js";

import {Todo} from "./entity/Todo";
import {User} from "./entity/User";

const LOGGER = getLogger("service");

export const getTodos = async (text: string | undefined): Promise<Todo[]> => {
    const todosRepo: Repository<Todo> = getConnection().getRepository(Todo);

    if (text) {
        LOGGER.debug("aaa");
        // query builder
        return await todosRepo.createQueryBuilder("todo")
            .where("todo.text = :text", {text})
            .getMany();
        // default
        // return await todosRepo.find({where: {text}});
    } else {
        return await todosRepo.find();
    }
}

export const addTodo = async (text: string, userNames: string[] | undefined): Promise<Todo> => getConnection()
    .manager.transaction(async (tManager) => {
        const todosRepo: Repository<Todo> = tManager.getRepository(Todo);
        const usersRepo: Repository<User> = tManager.getRepository(User);

        const todo = new Todo();
        todo.text = text;
        todo.user = await getOrCreateUserEntities(userNames, usersRepo);
        return await todosRepo.save(todo);
    })

const getOrCreateUserEntities = async (userNames: string[] | undefined, usersRepo: Repository<User>): Promise<User[]|undefined> => {
    if (userNames) {
        const userEntities = await usersRepo.find({where: {firstName: In(userNames)}})
        const dbUserNames = userEntities.map((entity) => entity.firstName);

        const newUserEntities = userNames
            .filter((firstName) => !dbUserNames.includes(firstName))
            .map((firstName) => {
                const userEntity = new User();
                userEntity.firstName = firstName;
                return userEntity;
            })
        const savedUserEntities = await usersRepo.save(newUserEntities);

        return [...userEntities, ...savedUserEntities];
    }
    return undefined;
}
