import MentoringSlotRepository from "@src/modules/mentoring-slot/infrastructure/db/repository/mentoring-slot.repository";
import { MentoringSlotRepositoryInterface } from "../../port/db/mentoring-slot.repository.interface";
import { GetMentoringSlotsByMissedService } from "./get-mentoring-slots-by-missed.service";
import mentoringSlotRepository from "@src/modules/mentoring-slot/infrastructure/db/repository/mentoring-slot.repository";


// Test for getMentoringSlotsByMissed
describe('get mentoring slot missed only if the user is authenticated', () => {
    
    beforeAll(() => {

   
    //     // mentoringSlotRepositoryMock = {
    //     //     findMentoringSlotsBetweenDates: () => [],
    //     // } as unknown as MentoringSlotRepositoryInterface;
    });

    it('should return the mentoring slots by missed if the user is authenticated', async () => {
        
// Create a mock - create a class
const mentoringSlotsMissedMock=[
    {
        id:1,
    },
];
        const mentoringSlotRepositoryMock = {
            findMentoringSlotsByMissed:() => mentoringSlotsMissedMock   
        };

        //instanciate class
        //pass paremeter we want 
      
        // pass in constructor the repository the mock 
        const getMentoringSlotsByMissedService = new GetMentoringSlotsByMissedService(mentoringSlotRepositoryMock);
        const returnValue = await getMentoringSlotsByMissedService.getMentoringSlotsByMissed(true);


        // how to test and return a table or array
        //expect(returnValue).toEqual([]); // this give juste a empty table
        //or  do it this way to verify if it is really a table
        // verify if the return value return what we are expected
        expect(returnValue).toEqual(mentoringSlotsMissedMock);
         
        });

        
        // const mentoringSlotCreationValidatorService = new MentoringSlotCreationDuplicateVerifierService(mentoringSlotRepositoryMockImpl);

        // expect(() => mentoringSlotCreationValidatorService.verifyDuplicates(createMentoringSlotInput)).rejects.toThrow(Exception);
    });


    //Test avec user authentciated at false 

//the service should return an error

//instanciated the service avec the mock from the repository

// cal th emethod get MentoringSlotsbYmISSED FROM TH SERVICE with the user authenticated to false

// verify 
describe('GetMentoringSlotsByMissedService tests', () => {
    it('should throw an exception if the user is not authenticated', async () => {

    // Create a mock - create a class
        
        const mentoringSlotMissedMock = [
            {
                id: 1,
            },
        ]
        const mentoringSlotRepositoryMock = {
            findMentoringSlotsByMissed: () => mentoringSlotMissedMock
        };

    //instanciate class
    //pass paremeter we want 

    // pass in constructor the repository the mock 


        const getMentoringSlotsByMissedService = new GetMentoringSlotsByMissedService(mentoringSlotRepositoryMock);
        await expect(getMentoringSlotsByMissedService.getMentoringSlotsByMissed(false)).rejects.toThrow('User is not authenticated');
});

});
        
    


