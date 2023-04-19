import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Course } from '../models/course.model';
import { CoursesService } from '@/services/courses.service';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '@/http/auth/authorization.guard';
import { CreateCourseInput } from '@/http/graphql/inputs/create-course.input';
import { AuthUser, CurrentUser } from '@/http/auth/current-user';
import { StudentsService } from '@/services/students.service';
import { EnrollmentsService } from '@/services/enrollments.service';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly studentsService: StudentsService,
    private readonly enrollmentsService: EnrollmentsService,
  ) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.coursesService.listAll();
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(@Args('id') id: string, @CurrentUser() user: AuthUser) {
    const student = await this.studentsService.findOneByAuthUserId(user.sub);

    if (!student) {
      throw new Error('Student not found');
    }

    const enrollment =
      await this.enrollmentsService.findOneByCourseIdAndStudentId({
        studentId: student.id,
        courseId: id,
      });

    if (!enrollment) {
      throw new UnauthorizedException('You are not enrolled in this course');
    }

    return this.coursesService.findOneById(id);
  }

  @Mutation(() => Course)
  createCourse(@Args('data') data: CreateCourseInput) {
    return this.coursesService.create(data);
  }
}
