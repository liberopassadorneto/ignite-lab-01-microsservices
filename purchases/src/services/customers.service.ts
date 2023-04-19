import { PrismaService } from '@/database/prisma.service';
import { Inject, Injectable } from '@nestjs/common';

interface CreateParams {
  authUserId: string;
}

@Injectable()
export class CustomersService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async findOneByAuthId(authUserId: string) {
    return this.prisma.customer.findUnique({
      where: {
        authUserId,
      },
    });
  }

  async findOneById(id: string) {
    return this.prisma.customer.findUnique({
      where: {
        id,
      },
    });
  }

  async create({ authUserId }: CreateParams) {
    const customer = await this.prisma.customer.create({
      data: {
        authUserId,
      },
    });

    return customer;
  }
}
