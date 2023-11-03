import Order from "@src/modules/order/infrastructured-db/entity/order.orm-entity"

  async findOrderAfterDate(date: string): Promise < Order[] > {
    const query = this.createQueryBuilder('order');

    query.where('order.createdAt >= :date', { date });

    const orders = await query.getMany();

    return orders;
}


