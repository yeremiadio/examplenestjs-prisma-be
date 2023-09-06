import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  task_name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  task_description: string;
}
