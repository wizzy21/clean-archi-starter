
import { NestExpressApplication } from '@nestjs/platform-express';
import { givenExistingApp } from '@test/utils/fixture/shared/app/app.fixture';
import { givenExistingDbConnection } from '@test/utils/fixture/shared/db-connection/db-connection.fixture';
import DataSource from '@src/modules/database/config/typeorm.config';
import request from 'supertest';
import { mentoringSlotBuilder } from '../mentoring-slot.e2e-builder';
import MentoringSlot from '@src/modules/mentoring-slot/domain/model/entity/mentoring-slot.entity';
import { givenExistingMentoringSlot } from '../mentoring-slot.e2e-fixture';
import { cleanApp } from '@test/utils/fixture/shared/app/clean-app';


    // 1. Create the app to test
    // 2. .Create the database to test -Arrange

    // 2.ACTION - Send a requete HTTP Get on the url /api/mentoring-slots/was -missed
    // Recuperate the HTTP Response
    //ask a response from a request -< so p ut request ina response variable



// ARRANGE
describe('Get Missed Mentoring Slots ', () => {
    // name we want for our test and what we are going to excute
    let app: NestExpressApplication;
    let connection: typeof DataSource;


    // Created this because ib the formulaire there should be the dates you choose to start and end the mentor session
    // once hit enter normally should reserve this dat
    // need to test if it works and if those dates are available
    // Refer to then the reponse should not be found - this says if there is already a slot taken then there should be an error 404 saying doesnt work or dates already taken 


/* Funtion is disponible by Vitest(Framework to test)
    * who will be executed before 
*/

    // beforeAll est fonction mise à dispo par Vitest (framework de test)
    // qui sera executée avant tous les tests
    // permet de créer l'application et la connection à la base de données
    // et les stocker dans des variables globales (dispos pour tous les tests de ce fichier)
    beforeAll(async () => {
        app = await givenExistingApp(app);
        connection = await givenExistingDbConnection();
    });

    it('should not return any missed mentoring slots if there is no missed mentoring slots in DB', async () => {
        // envoyer une requête HTTP GET sur l'url /api/mentoring-slots/was-missed
        // récupèrer la réponse HTTP

        const getMissedMentoringSlotsResponse = await request(app.getHttpServer()).get('/api/mentoring-slots/was-missed');

        //Verify that the response is a status 200
        // ACT AND ASSERT
        // vérifier que la réponse a bien un status 200
        expect(getMissedMentoringSlotsResponse.status).toBe(200);


        //ASSERTION
        //What should be expected
        // first start by test then see what is to be expect
        // the expect->
        // the .toBe->
        // Verify if the response has a body with the empty table
        // vérifier que la réponse a bien un body avec un tableau vide
        expect(getMissedMentoringSlotsResponse.body).toEqual([]);
        // même chose que :
        expect(getMissedMentoringSlotsResponse.body.length).toBe(0);
    });

    it('Should return a mentoring alot id if there is a missed mentoring slot in DB', async () => {
        //ARRANGE 
        //- Create a permenence in the database with was missed at truc

        const mentoringSlot = mentoringSlotBuilder().withWasMissed(true).build();
        const mentoringSlotInDb = await givenExistingMentoringSlot(connection, mentoringSlot);
// Can create manulay
// in specifying only the champs that interest us
        //its the same as -> const mentoringSlot = mentoringSlotBuilder().withWasMissed(true).build();
// const mentoringSlot = new MentoringSlot();
//         mentoringSlot.startDate = '2023-10-22T12:00:00:000Z';
//             mentoringSlot.endDate = '2023-10-22T12:00:00:000Z';
//             mentoringSlot.wasMissed =true; 


// To register in Database
//await givenExistingMentoringSlot(connection,mentoringSlot);

//verify when go get requette for url do have an element inside
const getMissedMentoringSlotsResponse = await request(app.getHttpServer()).get('/api/mentoring-slots/was-missed');
    
// Verify that the respone is status 200
expect(getMissedMentoringSlotsResponse.status).toBe(200);


// Verify that the response has a body with the permenance created
expect(getMissedMentoringSlotsResponse.body.length).toEqual(1);

// verify if wasmissed is true and corresponds to what is in db
        expect(getMissedMentoringSlotsResponse.body[0].id).toEqual(mentoringSlotInDb.id);
        expect(getMissedMentoringSlotsResponse.body[0].startDate).toEqual(mentoringSlotInDb.startDate);
        expect(getMissedMentoringSlotsResponse.body[0].endDate).toEqual(mentoringSlotInDb.endDate);
        
    });

    // Execute after all the tests of the fichier
    // Permits to suprrimer the donnees of the database an close the connection
    afterAll(async () => { await cleanApp(app, connection); 
    });     
});