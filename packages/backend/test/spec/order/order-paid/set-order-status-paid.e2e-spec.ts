import { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import { randomUUID } from 'crypto';
import { orderBuilder } from '../order.e2e-builder';
import { specifiedOrder } from '../order.e2e-utils';
import { whenUpdatingOrderStatus } from '../update-order.e2e-action';
import { OrderStatusEnum } from '@src/modules/order/domain/model/const/order-status.enum';
import Order from '@src/modules/order/infrastructured-db/entity/order.orm-entity';
import { DataSource } from 'typeorm';

describe('Set Order status paid', () => {
  let app: NestExpressApplication;
  let connection: typeof DataSource;
  let order: Order;
  let orderId = randomUUID();

  beforeAll(async () => {
    app = await givenExistingApp(app);
    connection = await givenExistingDbConnection();
    const orderBuild = orderBuilder().build();
    order = await specifiedOrder(connection, orderBuild);
  });


  it('should return 404 if the order is not found ', async () => {
    const orderResponse = await request(app.getHttpServer()).patch(`/api/orders/${orderId}/pay-order/`);
    expect(orderResponse.status).toBe(404);
  });

  it('should change the order status to paid ', async () => {
    const {updateOrderResponse} = await whenUpdatingOrderStatus(app,order,'pay-order');
    expect(updateOrderResponse.status).toBe(200);
    expect(updateOrderResponse.body.id).toEqual(order.id);
    expect(updateOrderResponse.body.status).toEqual(OrderStatusEnum.Paid);
  });

  afterAll(async () => {
    await cleanApp(app, connection);
  });
});
function givenExistingDbConnection(): import("typeorm").DataSource | PromiseLike<import("typeorm").DataSource> {
  throw new Error('Function not implemented.');
}

function givenExistingApp(app: NestExpressApplication<import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>>): NestExpressApplication<import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>> | PromiseLike<NestExpressApplication<import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>>> {
  throw new Error('Function not implemented.');
}

function cleanApp(app: NestExpressApplication<import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>>, connection: DataSource) {
  throw new Error('Function not implemented.');
}

