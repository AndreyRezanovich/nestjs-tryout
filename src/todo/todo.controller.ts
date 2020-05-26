import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from '../dto/create-dto';
import { TodoInterface } from '../models/todo.interface';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller('/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos() {
    return this.todoService.getTodos();
  }

  @Get(':id')
  getTodo(@Param('id') id) {
    return this.todoService.findTodo(id);
  }

  @Post()
  async createTodo(
    @Body(ValidationPipe) text: TodoDto,
  ): Promise<TodoInterface> {
    return await this.todoService.create(text);
  }

  @Put(':id')
  updateTodo(@Param('id') id, @Body() text) {
    console.log(text);
    return this.todoService.update(id, text.text);
  }

  @Put('check/:id')
  checkTodo(@Param('id') id) {
    return this.todoService.check(id);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.todoService.remove(id);
  }
}
