import { NestExpressApplication } from '@nestjs/platform-express';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
//import { DataSource } from 'typeorm';


describe('Get Orders before specified date', () => {
  let app: NestExpressApplication;
  let connection: typeof DataSource;

  beforeAll(async () => {
    app = await givenExistingApp(app);
    connection = await givenExistingDbConnection();
    
  });

  it('should return all orders before the specified date ', async () => {
 
    const getAllOrdersResponse = await request(app.getHttpServer()).get('/api/orders/all-orders-before-date/23-09-2023');

    // vérifier que la réponse a bien un status 200
    expect(getAllOrdersResponse.status).toBe(200);

    // vérifier que la réponse a bien un body avec un tableau vide
    expect(getAllOrdersResponse.body).toEqual([]);

  });


  // s'execute après tous les tests de ce fichier
  // permet de supprimer les données de la DB et de fermer la connection
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

