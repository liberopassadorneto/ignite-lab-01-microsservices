import { PrismaService } from '@/database/prisma.service';
import { Inject, Injectable } from '@nestjs/common';

interface CreateParams {
  authUserId: string;
}

@Injectable()
export class StudentsService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async listAll() {
    return this.prisma.student.findMany();
  }

  async findOneByAuthUserId(authUserId: string) {
    return this.prisma.student.findUnique({
      where: {
        authUserId,
      },
    });
  }

  async findOneById(id: string) {
    return this.prisma.student.findUnique({
      where: {
        id,
      },
    });
  }

  async create({ authUserId }: CreateParams) {
    return this.prisma.student.create({
      data: {
        authUserId,
      },
    });
  }
}
