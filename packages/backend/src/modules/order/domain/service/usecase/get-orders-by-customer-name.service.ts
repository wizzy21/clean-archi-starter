import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception";
import Order from "@src/modules/order/infrastructured-db/entity/order.orm-entity";
import OrderRepository from "@src/modules/order/infrastructured-db/respository/order.repository";
import { OrderRepositoryInterface } from "../../port/db/order.repository.interface";

export class GetOrdersByCustomerNameService {
    constructor(private readonly orderRepository: OrderRepositoryInterface) { }

    async findByCustomerName(customer: string): Promise<Order[]> {
        if (customer.length < 5 || /\d/.test(customer)) {
            throw new BadRequestException("Invalid customer name.");
        }

        const orders = await this.orderRepository.findByCustomerName(customer);
        return orders;
    }


}