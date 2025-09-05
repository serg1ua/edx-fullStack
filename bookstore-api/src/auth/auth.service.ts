import * as bcrypt from 'bcrypt';
import type { Response } from 'express';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SALT_ROUNDS } from '../config';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
  }

  async signAuthToken(data: Record<string, string>): Promise<string> {
    const authToken = await this.jwtService.signAsync(data);
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
