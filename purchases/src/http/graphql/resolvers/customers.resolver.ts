import {
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { Customer } from '@/http/graphql/models/customer.model';
import { CustomersService } from '@/services/customers.service';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '@/http/auth/authorization.guard';
import { AuthUser, CurrentUser } from '@/http/auth/current-user';
import { PurchasesService } from '@/services/purchases.service';
import { Purchase } from '@/http/graphql/models/purchase.model';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private readonly customersService: CustomersService,
    private readonly purchasesService: PurchasesService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  async me(@CurrentUser() user: AuthUser) {
    return this.customersService.findOneByAuthId(user.sub);
  }

  @ResolveField(() => Purchase)
  async purchases(@Parent() customer: Customer) {
    return this.purchasesService.findManyByCustomerId(customer.id);
  }

  // Apollo Federation
  // The purchases microservice is the main microservice!
  // The purchases microservice is the service that owns the User type.
  @ResolveReference()
  resolveReference(reference: { authUserId: string }) {
    return this.customersService.findOneByAuthId(reference.authUserId);
  }
}
