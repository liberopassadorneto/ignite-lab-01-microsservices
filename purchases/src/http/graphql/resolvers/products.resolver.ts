import { AuthorizationGuard } from '@/http/auth/authorization.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from '../models/product.model';
import { ProductsService } from '@/services/products.service';
import { CreateProductInput } from '@/http/graphql/inputs/create-product.input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product])
  // @UseGuards(AuthorizationGuard)
  async products() {
    return this.productsService.listAll();
  }

  @Mutation(() => Product)
  @UseGuards(AuthorizationGuard)
  async createProduct(@Args('data') data: CreateProductInput) {
    return this.productsService.create(data);
  }
}
