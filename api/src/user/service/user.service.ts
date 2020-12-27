import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
    private userRepository: UserRepository;

    constructor(
        @InjectRepository(UserRepository)
        userRepository: UserRepository
    ) {
        this.userRepository = userRepository;
    }

    getAllUsers(): Observable<User[]> {
        return from(this.userRepository.getAllUsers());
    }

    getUserById(id: string): Observable<User> {
        return from(this.userRepository.getUserById(id));
    }

    createUser(data: User): Observable<User> {
        return from(this.userRepository.createUser(data));
    }

    updateUser(id: string, data: User): Observable<User> {
        return from(this.userRepository.updateUser(id, data));
    }

    deleteUser(id: string): Observable<any> {
        return from(this.userRepository.deleteUser(id));
    }
}
