import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Student } from '@/http/graphql/models/student.model';
import { Course } from './course.model';

@ObjectType()
export class Enrollment {
  @Field(() => ID)
  id: string;

  @Field(() => Student)
  student: Student;

  // studentId is not a field, but a reference to the student
  studentId: string;

  @Field(() => Course)
  course: Course;

  // courseId is not a field, but a reference to the course
  courseId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  canceledAt: Date;
}
