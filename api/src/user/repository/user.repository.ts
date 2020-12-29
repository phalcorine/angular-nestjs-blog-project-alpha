import { ConflictException, NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "../models/user.entity";
import { User } from "../models/user.interface";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    async getAllUsers(): Promise<UserEntity[]> {
        return await this.find();
    }

    async getUserById(id: string): Promise<UserEntity> {
        const user =  await this.findOne(id);

        if(!user) {
            throw new NotFoundException('A user with the specified criteria was not found...')
        }

        return user;
    }

    async getUserByEmail(emailAddress: string): Promise<UserEntity> {
        const user = await this.findOne({ email: emailAddress });

        return user;
    }

    async getUserByUsername(username: string): Promise<UserEntity> {
        const user = await this.findOne({ username: username });

        return user;
    }

    async createUser(data: User): Promise<UserEntity> {
        let user = await this.getUserByUsername(data.username);
        if(user) {
            throw new ConflictException(`A user with the specified username: ${data.username} already exists...`);
        }

        user = new UserEntity();
        user.name = data.name;
        user.username = data.username;
        user.email = data.email;
        user.password = data.password;

        return await this.save(user);
    }

    async updateUser(id: string, data: User): Promise<UserEntity> {
        const user = await this.getUserById(id);

        user.name = data.name ?? user.name;

        await this.save(user);

        return user;
    }

    async deleteUser(id: string): Promise<any> {
        const user = await this.getUserById(id);

        return await this.remove(user);
    }
}