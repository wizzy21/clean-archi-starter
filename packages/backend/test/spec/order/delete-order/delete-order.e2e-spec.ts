import { NestExpressApplication } from '@nestjs/platform-express';

import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';


describe('Delete order', () => {
  let app: NestExpressApplication;
  let connection: typeof DataSource;

  beforeAll(async () => {
    app = await givenExistingApp(app);
    connection = await givenExistingDbConnection();
  });

  it('should delete an order ', async () => {
    const deleteOrder = await request(app.getHttpServer()).get('/api/orders/2/delete-order/');
    expect(deleteOrder.status).toBe(404);
  });
  
  afterAll(async () => {
    await cleanApp(app, connection);
  });
});
