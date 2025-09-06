import * as bcrypt from 'bcrypt';
import type { Response } from 'express';
import { sign } from 'jsonwebtoken';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ACCESS_TOKEN_EXPIRATION_TIME, SALT_ROUNDS } from '../config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtSecret: string;

  constructor(private readonly configService: ConfigService) {
    this.jwtSecret = this.configService.get<string>(
      'ACCESS_TOKEN_SECRET',
    ) as string;
  }

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
  }

  async verifyPassword(password: string, hash: string): Promise<void> {
    const isMatch = await bcrypt.compare(password, hash);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid userName or/and password');
    }
  }

  signAuthToken(data: Record<string, string>): string {
    const authToken = sign(data, this.jwtSecret, {
      expiresIn: `${ACCESS_TOKEN_EXPIRATION_TIME}m`, // 10 minutes
    });
    return authToken;
  }

  setCookie(authToken: string, res: Response): void {
    res.cookie('authToken', authToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
  }
}
