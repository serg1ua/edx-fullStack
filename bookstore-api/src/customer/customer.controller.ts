import type { Response, Request } from 'express';
import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';
import { CustomerService } from './customer.service';
import { LoginCustomerDto } from './dto/customer.dto';
import { Customer } from './customer.entity';
import { ReviewDto } from './dto/review.dto';

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
  async addReview(
    @Req() req: Request & { user: Customer },
    @Param('isbn') isbn: string,
    @Body() body: ReviewDto,
  ): Promise<string> {
    await this.customerService.addReview(req.user, isbn, body.review);
    return `The review for the book with ISBN ${isbn} has been added`;
  }

  @UseGuards(AuthGuard)
  @Patch('auth/review/:id')
  async updateReview(
    @Req() req: Request & { user: Customer },
    @Param('id') id: string,
    @Body() body: ReviewDto,
  ): Promise<string> {
    await this.customerService.updateReview(req.user, id, body.review);
    return `The review with ${id} has been updated`;
  }

  @UseGuards(AuthGuard)
  @Delete('auth/review/:id')
  async deleteReview(
    @Req() req: Request & { user: Customer },
    @Param('id') id: string,
  ): Promise<string> {
    await this.customerService.deleteReview(req.user, id);
    return `The review with ${id} has been deleted`;
  }
}
