import { IsNotEmpty } from 'class-validator';


export class TodoDto {
  @IsNotEmpty()
  text: string;
}

