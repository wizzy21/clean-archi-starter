import { OrderStatusEnum } from "../../model/const/order-status.enum";
import Order from "@src/modules/order/infrastructured-db/entity/order.orm-entity";
import { Exception } from "@src/modules/shared/domain/service/util/exception/exceptions.service";
import { ExceptionTypeEnum } from "@src/modules/shared/domain/const/exception-type.enum";
import { OrderRepositoryInterface } from "../../port/db/order.repository.interface";

export class CreateOrderService{
constructor(private readonly orderRepository:OrderRepositoryInterface){}

    async createOrder(customer: string, products: string[], status: OrderStatusEnum): Promise<Order> {
        const order ={
           customer,
            products,
            status: OrderStatusEnum.InCart
            // this will be create an order  with the status 'InCart' by default unless another status is provided.
        };

        

        const orderToSave =  this.orderRepository.create(order) as Order;
        try {
            const saveOrder = await this.orderRepository.save(orderToSave);
            return saveOrder;
        } catch (error) {
            throw new Exception(ExceptionTypeEnum.InternalServerError, `cannot save order: ${error.message}`)
        }

    }


   

}