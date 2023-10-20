
import Order from "@src/modules/order/infrastructured-db/entity/order.orm-entity";
import { OrderRepositoryInterface } from "../../port/db/order.repository.interface";

export class GetAllOrdersService{
    constructor(private readonly orderRepository: OrderRepositoryInterface) { }

    async getAllOrders(): Promise<Order[]> {
        return this.orderRepository.findAllOrders();
    }

}





