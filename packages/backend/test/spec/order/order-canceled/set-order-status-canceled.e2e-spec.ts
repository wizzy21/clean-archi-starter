import { NestExpressApplication } from '@nestjs/platform-express';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
//import { DataSource } from 'typeorm';


describe('Set Order status cancelled', () => {
  let app: NestExpressApplication;
  let connection: typeof DataSource;

  beforeAll(async () => {
    app = await givenExistingApp(app);
    connection = await givenExistingDbConnection();
  });

  it('should set status order at cancelled ', async () => {
    const setOrderAsCancelled = await request(app.getHttpServer()).get('/api/orders/2/cancel-order/');
    expect(setOrderAsCancelled.status).toBe(404);
    //expect(getAllOrdersResponse.body).toEqual([]);
  });

  afterAll(async () => {
    await cleanApp(app, connection);
  });
});
function givenExistingApp(app: NestExpressApplication<import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>>): NestExpressApplication<import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>> | PromiseLike<NestExpressApplication<import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>>> {
  throw new Error('Function not implemented.');
}

function givenExistingDbConnection(): import("typeorm").DataSource | PromiseLike<import("typeorm").DataSource> {
  throw new Error('Function not implemented.');
}

function cleanApp(app: NestExpressApplication<import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>>, connection: DataSource) {
  throw new Error('Function not implemented.');
}

