import { PrismaService } from '@/database/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import slugify from 'slugify';

interface CreateParams {
  title: string;
  slug?: string;
}

@Injectable()
export class CoursesService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async listAll() {
    return this.prisma.course.findMany();
  }

  async findOneById(id: string) {
    return this.prisma.course.findUnique({
      where: {
        id,
      },
    });
  }

  async findOneBySlug(slug: string) {
    return this.prisma.course.findUnique({
      where: {
        slug,
      },
    });
  }

  async create({ title, slug }: CreateParams) {
    const courseSlug = slug ?? slugify(title, { lower: true });

    const courseWithSameSlug = await this.prisma.course.findUnique({
      where: {
        slug: courseSlug,
      },
    });

    if (courseWithSameSlug) {
      throw new Error('Course already exists');
    }

    const course = await this.prisma.course.create({
      data: {
        title,
        slug: courseSlug,
      },
    });

    return course;
  }
}
