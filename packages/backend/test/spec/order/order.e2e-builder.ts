import { OrderStatusEnum } from "@src/modules/order/domain/model/const/order-status.enum";
import { OrderRepositoryInterface } from "@src/modules/order/domain/port/db/order.repository.interface";


const CreateOrderDtoInterface: OrderRepositoryInterface = {
  customer: "Jasmine",
  products: ["Limbo", "Chevrolet"],
};

export const orderBuilder = (orderCreateData: OrderRepositoryInterface = CreateOrderDtoInterface) => {
  return {
    withCustomer: (customer: OrderRepositoryInterface['customer']) => {
      return orderBuilder({
        ...orderCreateData,
        customer,
      });
    },

    withProducts: (products: OrderRepositoryInterface['products']) => {
      return orderBuilder({
        ...orderCreateData,
        products,
        customer,
        status:OrderStatusEnum
      });
    },

    build() {
      return orderCreateData;
    },
  };
};
