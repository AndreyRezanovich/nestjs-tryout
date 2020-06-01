import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from '../dto/create-dto';
import { TodoInterface } from '../models/todo.interface';
import { ValidationPipe } from '../pipes/validation.pipe';
import { SSEMiddleware } from '../sse/sse-middleware';
import { EventEmitter } from 'events';
import { Response } from 'express';

export enum Events {
  update = 'UPDATE',
  find = 'FIND'
}

const stringify = (json) => {
  return `data: ${JSON.stringify(json)}\n\n`;
};

@Controller('/todos')
export class TodoController {
  emitter = new EventEmitter();

  constructor(private readonly todoService: TodoService) {
  }

  async updateTodos() {
    this.emitter.emit(Events.update, await this.todoService.getTodos());
  }

  // @Get('/getmany')
  // getTodos() {
  //   // this.emitter.emit('created', { success: true });
  //   return this.todoService.getTodos();
  // }

  @Get(':id/getone')
  getTodo(@Param('id') id) {
    return this.todoService.findTodoById(id);
  }


  @Get('/sse')
  async connect(@Res() res: Response | any) {
    try {
      const todosArr = await this.todoService.getTodos();
      res.sse(stringify(todosArr));
      console.log('Connecting');
      this.emitter.on(Events.update, (data) => {
        res.sse(stringify(data));
      });
    } catch (err) {
      console.log(err);
    }
  }

  @Get('/find')
  async findTodo(@Query('text') text) {
    // console.log(text);
    return this.todoService.searchTodo(text);
    // const foundTodos = await this.todoService.searchTodo(text);
    // this.emitter.emit(Events.update, {action: 'find', data: foundTodos});
  }

  @Post('/create')
  async createTodo(@Body(ValidationPipe) text: TodoDto): Promise<TodoInterface> {
    const createRes = await this.todoService.create(text);
    if (createRes) {
      this.updateTodos();
    }
    return createRes;
  }

  @Put(':id/update')
  async updateTodo(@Param('id') id, @Body() todo) {
    console.log(todo);
    const editedTodo = await this.todoService.update(id, todo);
    if (editedTodo) {
      this.updateTodos();
    }
    return editedTodo;
    // return this.todoService.update(id, todo);
  }

  @Delete(':id/delete')
  async remove(@Param('id') id) {
    const deleteTodo = await this.todoService.remove(id);
    if (deleteTodo) {
      this.updateTodos();
    }
    return deleteTodo;
  }
}
