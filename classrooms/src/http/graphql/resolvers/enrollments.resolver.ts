import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Enrollment } from '../models/enrollment.model';
import { EnrollmentsService } from '@/services/enrollments.service';
import { AuthorizationGuard } from '@/http/auth/authorization.guard';
import { UseGuards } from '@nestjs/common';
import { Student } from '@/http/graphql/models/student.model';
import { Course } from '@/http/graphql/models/course.model';
import { StudentsService } from '@/services/students.service';
import { CoursesService } from '@/services/courses.service';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(
    private readonly enrollmentsService: EnrollmentsService,
    private readonly studentsService: StudentsService,
    private readonly coursesService: CoursesService,
  ) {}

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  enrollments() {
    return this.enrollmentsService.listAll();
  }

  @ResolveField(() => Student)
  student(@Parent() enrollment: Enrollment) {
    return this.studentsService.findOneById(enrollment.studentId);
  }

  @ResolveField(() => Course)
  course(@Parent() enrollment: Enrollment) {
    return this.coursesService.findOneById(enrollment.courseId);
  }
}
