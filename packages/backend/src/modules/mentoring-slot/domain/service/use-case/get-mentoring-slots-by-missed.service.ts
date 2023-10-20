import { boolean } from '@hapi/joi';
import MentoringSlot from '@src/modules/mentoring-slot/domain/model/entity/mentoring-slot.entity';
import { MentoringSlotRepositoryInterface } from '@src/modules/mentoring-slot/domain/port/db/mentoring-slot.repository.interface';

export class GetMentoringSlotsByMissedService {
    constructor(private readonly mentoringSlotRepository: MentoringSlotRepositoryInterface) { }

    // async getMentoringSlotsByMissed(): Promise<MentoringSlot[]> {
        
        async getMentoringSlotsByMissed(isUserAuthenticated:boolean):Promise<MentoringSlot[]>{

            if(!isUserAuthenticated){
                throw new Error('User is not authenticated');
            }
            
        const mentoringSlots = await this.mentoringSlotRepository.findMentoringSlotsByMissed();
        return mentoringSlots;
    }
}
      
    

