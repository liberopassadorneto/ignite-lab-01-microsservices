import { PrismaService } from '@/database/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import slugify from 'slugify';

interface CreateParams {
  title: string;
}

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async listAll() {
    return this.prisma.product.findMany();
  }

  async findOneById(id: string) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async create({ title }: CreateParams) {
    const slug = slugify(title, { lower: true });

    const productWithSameSlug = await this.prisma.product.findUnique({
      where: {
        slug,
      },
    });

    if (productWithSameSlug) {
      throw new Error('Product with same slug already exists');
    }

    const product = await this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });

    return product;
  }
}
