import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from '../dto/create-dto';
import { TodoInterface } from '../models/todo.interface';
import { ValidationPipe } from '../pipes/validation.pipe';


@Controller('/todos')
export class TodoController {

  constructor(private readonly todoService: TodoService) {
  }

  @Get()
  getTodos() {
    return this.todoService.getTodos();
  }

  @Get(':id/find')
  getTodo(@Param('id') id) {
    return this.todoService.findTodoById(id);
  }

  @Get('/search')
  findTodo(@Query('text') text: string) {
    return this.todoService.searchTodo(text);
  }

  @Post()
  async createTodo(@Body(ValidationPipe) text: TodoDto): Promise<TodoInterface> {
    return await this.todoService.create(text);
  }

  @Put(':id')
  async updateTodo(@Param('id') id, @Body() text) {
    return await this.todoService.update(id, text.text);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return this.todoService.remove(id);
  }
}
