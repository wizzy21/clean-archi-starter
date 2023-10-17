import { MentoringSlotRepositoryInterface } from '@src/modules/mentoring-slot/domain/port/db/mentoring-slot.repository.interface';
import MentoringSlot from '@src/modules/mentoring-slot/domain/model/entity/mentoring-slot.entity';
import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';
import { ExceptionTypeEnum } from '@src/modules/shared/domain/const/exception-type.enum';
import { CreateMentoringSlotDtoInterface } from '@src/modules/mentoring-slot/domain/model/dto/create-mentoring-slot.dto.interface';
import { MentoringSlotStatusEnum } from '@src/modules/mentoring-slot/domain/model/const/mentoring-slot-status.enum';
import MentoringSlotCreationDuplicateVerifierService from '@src/modules/mentoring-slot/domain/service/utils/mentoring-slot-creation-duplicate-verifier/mentoring-slot-creation-duplicate-verifier.service';

export class CreateMentoringSlotService {
  constructor(
    private readonly mentoringSlotRepository: MentoringSlotRepositoryInterface,
    private readonly mentoringSlotCreationDuplicateVerifierService: MentoringSlotCreationDuplicateVerifierService,
  ) {}

  async createMentoringSlot(createMentoringSlotDto: CreateMentoringSlotDtoInterface): Promise<MentoringSlot> {
    await this.mentoringSlotCreationDuplicateVerifierService.verifyDuplicates(createMentoringSlotDto);

    const createMentoringSlotWithCreator = {
      ...createMentoringSlotDto,
      status: MentoringSlotStatusEnum.Incoming,
    };

    return await this.saveMentoringSlot(createMentoringSlotWithCreator);
  }

  private async saveMentoringSlot(createMentoringSlotWithCreator: DeepPartial<MentoringSlot>): Promise<MentoringSlot> {
    try {
      const mentoringSlot = await this.mentoringSlotRepository.persist<MentoringSlot>(createMentoringSlotWithCreator);

      return mentoringSlot;
    } catch (error) {
      throw new Exception(ExceptionTypeEnum.InternalServerError, `Cannot persist mentoringSlot : ${error.message}`);
    }
  }
}
