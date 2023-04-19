import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Product } from '@/http/graphql/models/product.model';

enum PurchaseStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  FAILED = 'FAILED',
}

registerEnumType(PurchaseStatus, {
  name: 'PurchaseStatus',
  description: ' Available purchase statuses',
});

@ObjectType()
export class Purchase {
  @Field(() => ID)
  id: string;

  @Field(() => PurchaseStatus)
  status: PurchaseStatus;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Product)
  product: Product;

  // The following fields are not exposed to the GraphQL API
  // but are used internally by the resolver
  productId: string;
}
