import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
//import Order from '../../infrastructure/entity/order.orm-entity';
import { OrderRepositoryInterface } from '../../domain/port/db/order.repository.interface';
import { OrderStatusEnum } from '../../domain/model/const/order-status.enum';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import Order from '../entity/order.orm-entity';

export default class OrderRepository extends Repository<Order> implements OrderRepositoryInterface {
  constructor(
    @InjectDataSource()
    private readonly datasource: DataSource,
  ) 
  {
    super(Order, datasource.createEntityManager());
  }
  findById(id: string): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }
  persist?<T>(entityToBePersisted: DeepPartial<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }


  
  /* find() method is provided by TypeORM's Repository class and retrieves all
      records of the entity associated with the repository.
      * , if creating a new query but not adding any conditions or joins, it essentially becomes equivalent to SELECT * FROM orders; 
          so do not forecably need queryBuilder to -> the .find  method will automatical do -> SELECT * FROM orders;
      */
// 1. Retrieve all orders
  async findAllOrders(): Promise<Order[]> {
     return this.find();
   }

//Dates
// 2. Retrieve orders placed before a certain date
  async findByDateBeforeOrder(date: Date): Promise<Order[]> {
    return this.find({ where: { createdAt: (date) } });
     }


// 3. Retrieve orders placed after a certain date
async findByDateAfterOrder(date:Date): Promise<Order[]> {
  return this.find({ where: { createdAt: (date) } });
   }
  
// 4. Retrieve orders for a customer: must return an exception if the customer name requested is less than 5 characters long or contains digits.
  // async findByCustomerName(customerName: string): Promise<Order[]> {
  //   return this.find({ where: { customer: customerName } });
  //   }
  async findByCustomerName(customer: string): Promise<Order[]> {
    return this.find({ where: { customer } });
  }

  // 5. Place an order for payment
  async placeOrderForPayment(id: string): Promise<void> {
   await this.update(id, { status: OrderStatusEnum.Paid })
    
  }


  // 6. Cancel an order
  async cancelOrder(id: string): Promise<void> {
      await this.update(id, { status: OrderStatusEnum.Canceled})
  }

// Update Order

 //  updateOrder(order: Order): Promise<Order>{
  //   }


// 7. Delete order by id
  async deleteOrderById(id: string): Promise<void> {
      await this.delete(id)
    }
  }
// 8. Create order(default status 'InCart')


// async laterThanDate(date: Date):  {
//   throw new Error('Function not implemented.');
// }

// async earlierThanDate(date: Date):  {
//   throw new Error('Function not implemented.');
// }
























//   /*
// ({ where: { createdAt: LaterThanDate(date) } })      ({ where: { createdAt: LaterThanDate(date) } })
//   * tells the system to filter and find orders where the createdAt timestamp is later than the provided date. 
//     It's a way of specifying a filter condition for querying data from a database or a similar data source.

//   *syntax is often used in ORM frameworks like TypeORM, Sequelize, or Prisma to make it more intuitive 
//     to work with databases,allowing you to write queries using JavaScript/TypeScript objects instead of 
//     writing raw SQL queries. 
    
//     *The framework then translates these objects into SQL queries under the hood
//     */








 




  












function findByCustomerName(customer: any, string: any) {
  throw new Error('Function not implemented.');
}

