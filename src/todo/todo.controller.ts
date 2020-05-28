import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from '../dto/create-dto';
import { TodoInterface } from '../models/todo.interface';
import { ValidationPipe } from '../pipes/validation.pipe';
import { Response } from 'nestjs-sse';
import { EventEmitter } from 'events';


@Controller('/todos')
export class TodoController {
  emitter = new EventEmitter();
  constructor(private readonly todoService: TodoService) {
  }

  @Get()
  getTodos() {
    return this.todoService.getTodos();

  }

  @Get(':id')
  getTodo(@Param('id') id) {
    return this.todoService.findTodoById(id);
  }

  @Post()
  async createTodo(@Body(ValidationPipe) text: TodoDto): Promise<TodoInterface> {
    return await this.todoService.create(text);
  }

  @Put(':id')
  updateTodo(@Param('id') id, @Body() text) {
    console.log(text);
    return this.todoService.update(id, text.text);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    this.todoService.remove(id).then(r => r);
    this.emitter.emit('removed', { success: true });
  }

  @Get()
  findTodo(@Body() text) {
    return this.todoService.searchTodo(text);
  }

  @Get('/todos')
  connect(@Res() res: Response) {
    res.sse(`data: ${JSON.stringify({ text: 'init todo' })}\n\n`);
    console.log('Connecting');
    this.emitter.on('test', (data) => {
      res.sse(`data: ${JSON.stringify(data)}\n\n`);
    });
  }
}

