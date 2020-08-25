import {Entity, Column, PrimaryGeneratedColumn, ManyToMany} from "typeorm";
import {Todo} from "./Todo";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @ManyToMany(type => Todo)
    todos: Todo[];
}
