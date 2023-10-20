import { RepositoryInterface } from "@src/modules/shared/domain/port/db/repository.interface";
import Order from "../../../infrastructured-db/entity/order.orm-entity";
import OrderRepository from "../../../infrastructured-db/respository/order.repository";

export interface OrderRepositoryInterface extends RepositoryInterface{
   
    findById(id: string): Promise<Order[]>;

    findAllOrders(): Promise<Order[]>;
    findByDateBeforeOrder(date: Date): Promise<Order[]>;
    findByDateAfterOrder(date: Date): Promise<Order[]>;
    findByCustomerName(customerName: string): Promise<Order[]>;
    // createOrder(customer: string, products: string[], ): Promise<Order>;
    // updateOrder(order: Order): Promise<Order>;
    deleteOrderById(id: string): Promise<void>;
    


}