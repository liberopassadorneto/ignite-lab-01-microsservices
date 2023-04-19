import { DatabaseModule } from '@/database/database.module';
import { validate } from '@/env/env-validation';
import { CustomersResolver } from '@/http/graphql/resolvers/customers.resolver';
import { PurchasesResolver } from '@/http/graphql/resolvers/purchases.resolver';
import { MessagingModule } from '@/messaging/messaging.module';
import { CustomersService } from '@/services/customers.service';
import { ProductsService } from '@/services/products.service';
import { PurchasesService } from '@/services/purchases.service';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';
import { ProductsResolver } from './graphql/resolvers/products.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
    DatabaseModule,
    MessagingModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],

  providers: [
    ProductsService,
    ProductsResolver,

    PurchasesService,
    PurchasesResolver,

    CustomersService,
    CustomersResolver,
  ],
})
export class HttpModule {}
