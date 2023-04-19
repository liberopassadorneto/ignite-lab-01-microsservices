import { DatabaseModule } from '@/database/database.module';
import { validate } from '@/env/env-validation';
import { CoursesService } from '@/services/courses.service';
import { EnrollmentsService } from '@/services/enrollments.service';
import { StudentsService } from '@/services/students.service';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';
import { CoursesResolver } from './graphql/resolvers/courses.resolver';
import { EnrollmentsResolver } from './graphql/resolvers/enrollments.resolver';
import { StudentsResolver } from './graphql/resolvers/students.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    CoursesService,
    CoursesResolver,

    EnrollmentsService,
    EnrollmentsResolver,

    StudentsService,
    StudentsResolver,
  ],
})
export class HttpModule {}
