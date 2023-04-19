import { PrismaService } from '@/database/prisma.service';
import { Inject, Injectable } from '@nestjs/common';

interface FindOneByCourseIdAndStudentIdParams {
  courseId: string;
  studentId: string;
}

interface CreateParams {
  courseId: string;
  studentId: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async findOneByCourseIdAndStudentId({
    courseId,
    studentId,
  }: FindOneByCourseIdAndStudentIdParams) {
    return this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        cancelledAt: null,
      },
    });
  }

  async listAll() {
    return this.prisma.enrollment.findMany({
      where: {
        cancelledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findManyByStudentId(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        cancelledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create({ courseId, studentId }: CreateParams) {
    return this.prisma.enrollment.create({
      data: {
        courseId,
        studentId,
      },
    });
  }
}
