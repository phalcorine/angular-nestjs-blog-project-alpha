import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, throwError } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators'
import { AuthService } from 'src/auth/service/auth.service';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
    private userRepository: UserRepository;
    private authService: AuthService;

    constructor(
        @InjectRepository(UserRepository)
        userRepository: UserRepository,
        authService: AuthService
    ) {
        this.userRepository = userRepository;
        this.authService = authService;
    }

    getAllUsers(): Observable<User[]> {
        return from(this.userRepository.getAllUsers()).pipe(
            map((users: UserEntity[]) => {
                return users.map((user) => user.toResponseObject());
            }),
            catchError((err) => throwError(err)),
        );
    }

    getUserById(id: string): Observable<User> {
        return from(this.userRepository.getUserById(id)).pipe(
            map((user: UserEntity) => {
                return user.toResponseObject();
            }),
        );
    }

    createUser(data: User): Observable<User> {
        return this.authService.hashPassword(data.password).pipe(
            switchMap((passwordHash: string) => {
                data.password = passwordHash;

                return from(this.userRepository.createUser(data)).pipe(
                    map((user) => user.toResponseObject()),
                    catchError((err) => throwError(err))
                )
            }),
        );
    }

    updateUser(id: string, data: User): Observable<User> {
        return from(this.userRepository.updateUser(id, data))
            .pipe(
                map((user) => user.toResponseObject()),
            );
    }

    deleteUser(id: string): Observable<any> {
        return from(this.userRepository.deleteUser(id));
    }

    login(authCredentials: AuthCredentialsDto): Observable<string> {
        const { email, password } = authCredentials;
        return this.validateUser(email, password).pipe(
            switchMap((user: User) => {
                if(user) {
                    return this.authService.generateJWT(user).pipe(
                        map((jwt: string) => jwt)
                    )
                }
            }),
            catchError((err) => throwError(err)),
        );
    }

    private validateUser(email: string, password: string): Observable<User> {
        return from(this.userRepository.getUserByEmail(email)).pipe(
            switchMap((user: UserEntity) => {
                if(!user) {
                    throw new UnauthorizedException('Invalid login credentials...');
                }
                return this.authService.comparePasswords(password, user.password)
                    .pipe(
                        map((match: boolean) => {
                            if(match) {
                                return user.toResponseObject();
                            } else {
                                throw new UnauthorizedException('Invalid login credentials...')
                            }
                        })
                    )
            }),
            catchError((err) => throwError(err)),
        );
    }
}
