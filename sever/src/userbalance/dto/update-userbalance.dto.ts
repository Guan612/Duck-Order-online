import { PartialType } from '@nestjs/swagger';
import { CreateUserbalanceDto } from './create-userbalance.dto';

export class UpdateUserbalanceDto extends PartialType(CreateUserbalanceDto) {}
