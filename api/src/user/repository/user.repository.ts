import { NotFoundException } from "@nestjs/common";
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

    async createUser(data: User): Promise<User> {
        const user = new UserEntity();
        user.name = data.name;
        user.username = data.username;

        return await this.save(user);
    }

    async updateUser(id: string, data: User): Promise<UserEntity> {
        const user = await this.getUserById(id);

        user.name = data.name;
        user.username = data.username;

        return await this.save(user);
    }

    async deleteUser(id: string): Promise<any> {
        const user = await this.getUserById(id);

        return await this.remove(user);
    }
}