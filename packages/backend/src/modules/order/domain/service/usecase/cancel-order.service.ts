import orderRepository from "@src/modules/order/infrastructured-db/respository/order.repository"
import { OrderRepositoryInterface } from "../../port/db/order.repository.interface";
import { OrderStatusEnum } from "../../model/const/order-status.enum";
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception";
import Order from "@src/modules/order/infrastructured-db/entity/order.orm-entity";
import OrderRepository from "@src/modules/order/infrastructured-db/respository/order.repository";

export class CancelOrderService {

    constructor(private readonly orderRepository: OrderRepositoryInterface) { }

    // Cancel An Order
    async cancelOrder(id: string): Promise<Order> {
        const order = await this.orderRepository.findById(id);
        if (!order) throw new BadRequestException('Order not found.');
        //order.status = 'Cancelled';
        OrderStatusEnum.Canceled;
        return this.orderRepository.save(order);
    }

}