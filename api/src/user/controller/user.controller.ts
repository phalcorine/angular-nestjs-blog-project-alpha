import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { User } from '../models/user.interface';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
    private userService: UserService;
    constructor(userService: UserService) {
        this.userService = userService;
    }

    @Post('login')
    @UsePipes(ValidationPipe)
    login(@Body() authCredentials: AuthCredentialsDto): Observable<UserAuthSuccessResponse> {
        return this.userService.login(authCredentials).pipe(
            map((jwt: string) => {
                const response: UserAuthSuccessResponse = {
                    accessToken: jwt
                };

                return response;
            }),
        )
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
    @UsePipes(ValidationPipe)
    createUser(@Body() data: User): Observable<User> {
        return this.userService.createUser(data).pipe(
            map((user: User) => user),
            catchError((err) => throwError(err)),
        );
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

export interface UserAuthSuccessResponse {
    accessToken: string;
}
