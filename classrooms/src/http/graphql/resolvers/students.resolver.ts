import { AuthorizationGuard } from '@/http/auth/authorization.guard';
import { StudentsService } from '@/services/students.service';
import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Student } from '../models/student.model';
import { Enrollment } from '@/http/graphql/models/enrollment.model';
import { EnrollmentsService } from '@/services/enrollments.service';
import { AuthUser, CurrentUser } from '@/http/auth/current-user';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly enrollmentsService: EnrollmentsService,
  ) {}

  // @Query(() => Student)
  // @UseGuards(AuthorizationGuard)
  // async me(@CurrentUser() user: AuthUser) {
  //   return this.studentsService.findOneByAuthUserId(user.sub);
  // }

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  async students() {
    return this.studentsService.listAll();
  }

  @ResolveField(() => Enrollment)
  async enrollments(@Parent() student: Student) {
    return this.enrollmentsService.findManyByStudentId(student.id);
  }
}
