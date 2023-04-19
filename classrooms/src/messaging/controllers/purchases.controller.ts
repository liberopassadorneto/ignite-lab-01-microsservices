import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { StudentsService } from '@/services/students.service';
import { EnrollmentsService } from '@/services/enrollments.service';
import { CoursesService } from '@/services/courses.service';

export interface Customer {
  authUserId: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
}

export interface PurchaseCreatedPayload {
  customer: Customer;
  product: Product;
}

@Controller()
export class PurchasesController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly coursesService: CoursesService,
    private readonly enrollmentsService: EnrollmentsService,
  ) {}
  @EventPattern('purchases.purchase-created')
  async purchaseCreated(@Payload() payload: PurchaseCreatedPayload) {
    console.log('purchase created on classroom service');

    // authUserId is the id that we use to identify the user in any microservice
    // Could be any unique identifier, like an email, username, CPF, etc.

    // payload.customer.authUserId -> id referente ao microsserviço de purchases
    // authUserId é o identificador único entre os microsserviços
    // em classrooms: authUserId é o identificador único para o student
    // em purchases: authUserId é o identificador único para o customer
    const { authUserId } = payload.customer;

    let student = await this.studentsService.findOneByAuthUserId(authUserId);

    if (!student) {
      student = await this.studentsService.create({
        authUserId,
      });
    }

    // payload.product.slug: é o identificador único para o curso e o produto entre os microsserviços
    // em classrooms: slug é o identificador único para o curso
    // em purchases: slug é o identificador único para o produto
    // ou seja, slug é o identificador único para o curso e o produto entre os microsserviços
    let course = await this.coursesService.findOneBySlug(payload.product.slug);

    if (!course) {
      course = await this.coursesService.create({
        title: payload.product.title,
      });
    }

    await this.enrollmentsService.create({
      courseId: course.id,
      studentId: student.id,
    });
  }
}
