import { PrismaService } from '@/database/prisma.service';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from './auth/authorization.guard';

@Resolver()
export class TestResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => String)
  @UseGuards(AuthorizationGuard)
  async hello() {
    return `hello world`;
  }
}
