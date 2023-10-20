import OrderRepository from "@src/modules/order/infrastructured-db/respository/order.repository";
import { OrderRepositoryInterface } from "../../port/db/order.repository.interface";

export class DeleteOrderService {
    constructor(private readonly orderRepository: OrderRepositoryInterface) { }

    async deleteOrderById(orderId: string): Promise<void> {
        await this.orderRepository.deleteOrderById(orderId);
    }
}