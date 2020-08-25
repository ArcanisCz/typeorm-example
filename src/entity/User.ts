import {Entity, Column, PrimaryGeneratedColumn, ManyToMany} from "typeorm";
import {Todo} from "./Todo";
import {Index} from "typeorm/index";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index({unique: true})
    firstName: string;

    @Column({nullable: true})
    lastName: string;

    @ManyToMany(type => Todo)
    todos: Todo[];
}
