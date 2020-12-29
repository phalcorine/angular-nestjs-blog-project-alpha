import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.interface";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
        unique: true
    })
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }

    toResponseObject(): User {
        const { password, ...response } = this;
        return response;
    }
}