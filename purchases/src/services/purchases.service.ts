import { PrismaService } from '@/database/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { KafkaService } from '@/messaging/kafka.service';
import { CustomersService } from '@/services/customers.service';

interface CreateParams {
  productId: string;
  customerId: string;
}

@Injectable()
export class PurchasesService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
    private readonly kakfa: KafkaService,
    private readonly customersService: CustomersService,
  ) {}

  async listAll() {
    return this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findManyByCustomerId(customerId: string) {
    return this.prisma.purchase.findMany({
      where: {
        customerId,
      },
      include: {
        product: true,
      },
    });
  }

  async create({ customerId, productId }: CreateParams) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const purchase = await this.prisma.purchase.create({
      data: {
        productId,
        customerId,
      },
    });

    const customer = await this.customersService.findOneById(customerId);

    this.kakfa.emit('purchases.purchase-created', {
      customer: {
        authUserId: customer.authUserId,
      },
      product: {
        id: product.id,
        title: product.title,
        slug: product.slug,
      },
    });

    return purchase;
  }
}
