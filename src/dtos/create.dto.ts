import { IsString, Length } from 'class-validator';

export class CreateDto {
  @IsString()
  @Length(3, 100)
  name!: string;
}
