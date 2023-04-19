import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Purchase } from '@/http/graphql/models/purchase.model';

@ObjectType('User')
// Apollo Federation
// user in purchases microservice is customer and in classrooms is student
// authUserId is the id in common between purchases and classrooms microservices
// in purchases the user is "customer" and in classrooms is "student"
// Customer and Student are the same User
@Directive('@key(fields: "authUserId")')
export class Customer {
  // @Field(() => ID)
  id: string;

  @Field(() => ID)
  authUserId: string;

  @Field(() => [Purchase])
  purchases: Purchase[];
}
