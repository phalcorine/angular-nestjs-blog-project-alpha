import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { from, Observable, of } from 'rxjs';
import { User } from 'src/user/models/user.interface';

@Injectable()
export class AuthService {
    private jwtService: JwtService;

    constructor(jwtService: JwtService) {
        this.jwtService = jwtService;
    }

    generateJWT(user: User): Observable<string> {
        return from(this.jwtService.signAsync({
            user: user
        }));
    }

    hashPassword(password: string): Observable<string> {
        return from(bcrypt.hash(password, 12));
    }

    comparePasswords(attemptedPassword: string, passwordHash: string): Observable<boolean> {
        return from(bcrypt.compare(attemptedPassword, passwordHash));
    }
}
