import Order from "@src/modules/order/infrastructured-db/entity/order.orm-entity";
import OrderRepository from "@src/modules/order/infrastructured-db/respository/order.repository";
import { OrderRepositoryInterface } from "../../port/db/order.repository.interface";


export class GetAllOrdersBeforeDateService {
    
    constructor(private readonly orderRepository:OrderRepositoryInterface){}
    
    async getOrdersBeforeDate(date: Date): Promise<Order[]> {
        return this.orderRepository.findByDateBeforeOrder(date);
    }

}

