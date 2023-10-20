import { NestExpressApplication } from '@nestjs/platform-express';

import request from 'supertest';

import { orderBuilder } from '../order.e2e-builder';
import { DataSource } from 'typeorm/data-source';



describe('Create Order', () => {
    let app: NestExpressApplication;
    let connection: typeof DataSource;

    beforeAll(async () => {
        app = await givenExistingApp(app);
        connection = await givenExistingDbConnection();
    });

    it('should create an order',async () => {
        const order = orderBuilder().build();
        const orderResponse = await request(app.getHttpServer()).post('/api/orders/create-order/').send(order);
        console.log(orderResponse.error);
        expect(orderResponse.status).toBe(201);
        console.log(orderResponse.body);
        expect(orderResponse.body.customer).toEqual(order.customer)
    });



    afterAll(async () => {
        await cleanApp(app, connection);
    });
})

function givenExistingApp(app: NestExpressApplication<import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>>): NestExpressApplication<import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>> | PromiseLike<NestExpressApplication<import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>>> {
    throw new Error('Function not implemented.');
}


function givenExistingDbConnection(): import("typeorm").DataSource | PromiseLike<import("typeorm").DataSource> {
    throw new Error('Function not implemented.');
}


function cleanApp(app: NestExpressApplication<import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>>, connection: DataSource) {
    throw new Error('Function not implemented.');
}
