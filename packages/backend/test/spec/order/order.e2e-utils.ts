
import  DataSource  from '@src/modules/database/config/typeorm.config';
import Order from '@src/modules/order/infrastructured-db/entity/order.orm-entity';

export const specifiedOrder = async (connection: typeof DataSource, orderBuild: OrderRepositoryDtoInterface) => {
    const orderRepository = connection.getRepository(Order);
    const order = orderRepository.create(orderBuild as DeepPartial<Order>);

    return orderRepository.save(order);
};