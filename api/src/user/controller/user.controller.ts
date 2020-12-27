import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
    private userService: UserService;
    constructor(userService: UserService) {
        this.userService = userService;
    }

    @Get()
    getAllUsers(): Observable<User[]> {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    getUserById(@Param('id') id: string): Observable<User> {
        return this.userService.getUserById(id);
    }

    @Post()
    createUser(@Body() data: User): Observable<User> {
        return this.userService.createUser(data);
    }

    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() data: User): Observable<User> {
        return this.userService.updateUser(id, data);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string): Observable<any> {
        return this.userService.deleteUser(id);
    }
}
