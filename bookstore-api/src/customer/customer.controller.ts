import type { Response, Request } from 'express';
import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';
import { CustomerService } from './customer.service';
import { LoginCustomerDto } from './customer.dto';
import { Customer } from './customer.entity';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly authService: AuthService,
    private readonly customerService: CustomerService,
  ) {}

  @Post('login')
  async login(
    @Body() dto: LoginCustomerDto,
    @Res() res: Response,
  ): Promise<Response<Pick<Customer, 'id' | 'userName'>>> {
    const { id, userName, authToken } = await this.customerService.login(dto);

    this.authService.setCookie(authToken, res);
    return res.send({ id, userName });
  }

  @UseGuards(AuthGuard)
  @Post('auth/review/:isbn')
  addReview(
    @Req() req: Request & { user: Customer },
    @Param('isbn') isbn: string,
    @Body() body: Record<'review', string>,
  ) {
    return this.customerService.addReview(req.user, isbn, body.review);
  }
}
