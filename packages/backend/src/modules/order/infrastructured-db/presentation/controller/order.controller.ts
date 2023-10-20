import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import Order from '../../entity/order.orm-entity';
import { OrderStatusEnum } from '@src/modules/order/domain/model/const/order-status.enum';
import { GetAllOrdersService } from '@src/modules/order/domain/service/usecase/get-all-orders.service';
import { GetOrdersByCustomerNameService } from '@src/modules/order/domain/service/usecase/get-orders-by-customer-name.service';
import { GetAllOrdersAfterDateService } from '@src/modules/order/domain/service/usecase/get-all-orders-after-date.service';
import { GetAllOrdersBeforeDateService } from '@src/modules/order/domain/service/usecase/get-all-orders-before-date.service';
import { DeleteOrderService } from '@src/modules/order/domain/service/usecase/delete-order.service';
import { CreateOrderService } from '@src/modules/order/domain/service/usecase/create-order.service';
import { CancelOrderService } from '@src/modules/order/domain/service/usecase/cancel-order.service';

@Controller('/orders')
export default class OrderController {
    
constructor(

    private readonly getAllOrdersService: GetAllOrdersService,
    private readonly getAllOrdersBeforeDateService: GetAllOrdersBeforeDateService,
    private readonly getAllOrdersAfterDateService: GetAllOrdersAfterDateService,
    private readonly getOrdersByCustomerNameService: GetOrdersByCustomerNameService,
    private readonly deleteOrderService: DeleteOrderService,
    private readonly createOrderService: CreateOrderService,
    private readonly cancelOrderService: CancelOrderService
) {}

// 1. Retrieve all orders
    @Get('/all-orders')
    async getAllOrders(): Promise<Order[]> {
        return await this.getAllOrdersService.getAllOrders();
    }
    //Dates 
    // 2. Retrieve orders placed before a certain date

    @Get('/before/:date')
    async getAllOrdersBeforeDate(@Query('date') date: string) {
       // const beforeDate = new Date(date);  // Convert the query string to a Date object
        return this.getAllOrdersBeforeDateService.getOrdersBeforeDate(new Date(date));
    }

   

 // 3. Retrieve orders placed after a certain date
    @Get('/after/:date')
    async getOrdersAfterDate(@Query('date') date: string) {
        //const afterDate = new Date(date);  // Convert the query string to a Date object
        return this.getAllOrdersAfterDateService.getOrdersAfterDate(new Date(date));
    }

    // 4. Retrieve orders for a customer: must return an exception if the customer name requested is less than 5 characters long or contains digits.

    @Get('customer/:customerName')
    async getOrdersByCustomerName(@Param('customerName') customerName: string) {
        return this.getOrdersByCustomerNameService.findByCustomerName(customerName);
    }

    // 5. Place an order for payment


    // 6. Cancel an order
    @Put('/cancel/:id')
    async cancelOrder(@Param('id') id: string) {
        return this.cancelOrderService.cancelOrder(id);
    }


    // 7. Delete order by id
    @Delete('/delete/:id')
    async deleteOrder(@Param('id') id: string) {
        return this.deleteOrderService.deleteOrderById(id);
    }
    
    // 8. Create order(default status 'InCart')
   
    @Post()
    async createOrder(@Body() order: Order) {
        return this.createOrderService.createOrder(order);
    }

    // 9. Update Order

    // @Patch('/customer/:id')
    // async updateOrder(@Param('id') id: string, @Body() updateOrderDto: Partial<Order>): Promise<void> {
    //     return this.updateOrderService.updateOrder(id, updateOrderDto);
    }




    




