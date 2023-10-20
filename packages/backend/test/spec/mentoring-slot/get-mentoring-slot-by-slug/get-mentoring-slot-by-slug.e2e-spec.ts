
import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { mentoringSlotBuilder } from '../mentoring-slot.e2e-builder';
import MentoringSlot from '@src/modules/mentoring-slot/domain/model/entity/mentoring-slot.entity';
import { givenExistingMentoringSlot } from '../mentoring-slot.e2e-fixture';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';

// ARRANGE
describe('Get Missed Mentoring Slots By Slug', () => {
    // name we want for our test and what we are going to excute
    let app: NestExpressApplication;
    let connection: typeof DataSource;

 beforeAll(async () => {
        app = await givenExistingApp(app);
        connection = await givenExistingDbConnection();
    });

    it('should not return any missed mentoring slots if there is no missed mentoring slots in DB', async () => {
       
        const getMentoringSlotBySlugResponse = await request(app.getHttpServer()).get(`/api/mentoring-slots/by-slug/ghdhdhtfhrhy`);

      
        expect(getMentoringSlotBySlugResponse.status).toBe(404);

    });
    it('Should return a mentoring slot by slug if there is mentoring slot in DB', async () => {

        const mentoringSlot= mentoringSlotBuilder().build();
        const mentoringSlotInDb = await givenExistingMentoringSlot(connection,mentoringSlot);


        const getMentoringSlotBySlugResponse = await request(app.getHttpServer()).get(`/api/mentoring-slots/${mentoringSlotInDb.slug}`);


        expect(getMentoringSlotBySlugResponse.status).toBe(200);
        expect(getMentoringSlotBySlugResponse.body.id).toEqual(mentoringSlotInDb.slug);

    });

    afterAll(async () => {
        await cleanApp(app, connection);
    });
});