import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, JoinTable, ManyToMany} from "typeorm";
import {User} from "./User";

@Entity()
export class Todo {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({name: "pokus"})
    text: string;

    @CreateDateColumn()
    date: number;

    @ManyToMany(type => User)
    @JoinTable()
    user: User[];
}
