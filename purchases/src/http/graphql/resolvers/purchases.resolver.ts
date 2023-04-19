import { AuthorizationGuard } from '@/http/auth/authorization.guard';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PurchasesService } from '@/services/purchases.service';
import { Purchase } from '@/http/graphql/models/purchase.model';
import { Product } from '@/http/graphql/models/product.model';
import { ProductsService } from '@/services/products.service';
import { CreatePurchaseInput } from '@/http/graphql/inputs/create-purchase.input';
import { AuthUser, CurrentUser } from '@/http/auth/current-user';
import { CustomersService } from '@/services/customers.service';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private readonly purchasesService: PurchasesService,
    private readonly productsService: ProductsService,
    private readonly customersService: CustomersService,
  ) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  async purchases() {
    return this.purchasesService.listAll();
  }

  @ResolveField(() => Product)
  async product(@Parent() purchase: Purchase) {
    return this.productsService.findOneById(purchase.productId);
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @Args('data') data: CreatePurchaseInput,
    @CurrentUser() user: AuthUser,
  ) {
    let customer = await this.customersService.findOneByAuthId(user.sub);

    if (!customer) {
      customer = await this.customersService.create({
        authUserId: user.sub,
      });
    }

    const purchase = this.purchasesService.create({
      productId: data.productId,
      customerId: customer.id,
    });

    return purchase;
  }
}
