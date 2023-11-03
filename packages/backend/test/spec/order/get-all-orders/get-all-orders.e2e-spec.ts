import { NestExpressApplication } from '@nestjs/platform-express';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
//import { DataSource } from 'typeorm';


describe('Get Orders', () => {
  let app: NestExpressApplication;
  let connection: typeof DataSource;

  
  beforeAll(async () => {
    app = await givenExistingApp(app);
    connection = await givenExistingDbConnection();
  });

  it('should return all orders ', async () => {
 

    const getAllOrdersResponse = await request(app.getHttpServer()).get('/api/orders/all-orders');

    // vérifier que la réponse a bien un status 200
    expect(getAllOrdersResponse.status).toBe(200);

    // vérifier que la réponse a bien un body avec un tableau vide
    expect(getAllOrdersResponse.body).toEqual([]);

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

