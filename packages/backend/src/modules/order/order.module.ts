import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrderController from '@src/modules/order/infrastructured-db/presentation/controller/order.controller';
import { CancelOrderService } from './domain/service/usecase/cancel-order.service';
import { OrderRepositoryInterface } from './domain/port/db/order.repository.interface';
import { DeleteOrderService } from './domain/service/usecase/delete-order.service';
import { CreateOrderService } from './domain/service/usecase/create-order.service';
import { GetAllOrdersService } from './domain/service/usecase/get-all-orders.service';
import { GetOrdersByCustomerNameService } from './domain/service/usecase/get-orders-by-customer-name.service';
import OrderRepository from './infrastructured-db/respository/order.repository';
import Order from './infrastructured-db/entity/order.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [
    {
      provide: 'OrderRepositoryInterface',
      useClass: OrderRepository,
    },
    {
      provide: GetAllOrdersService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetAllOrdersService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    }, {
      provide: GetAllOrdersService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetAllOrdersService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],

    }, {
      provide: GetAllOrdersService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetAllOrdersService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],

    }, 
    {
      provide: GetOrdersByCustomerNameService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetOrdersByCustomerNameService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],

    }, 
    {
      provide: CancelOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new CancelOrderService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],

    }, {
      provide: DeleteOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new DeleteOrderService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],

    }, {
      provide: CreateOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new CreateOrderService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],

    },],
})
export default class OrderModule { }
