import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Enrollment } from './enrollment.model';

@ObjectType('User')
// Apollo Federation
// The purchases microservice is the service that owns the User type.
// So, we need to extend the User type with the @extends directive.
@Directive('@extends')
@Directive('@key(fields: "authUserId")')
export class Student {
  // @Field(() => ID)
  id: string;

  @Field(() => ID)
  @Directive('@external')
  // Apollo Federation
  // The authUserId is a "global" id that is unique across all microservices.
  authUserId: string;

  @Field(() => [Enrollment])
  enrollments: Enrollment[];
}
