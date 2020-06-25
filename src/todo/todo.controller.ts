import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from '../dto/create-dto';
import { TodoInterface } from '../models/todo.interface';
import { ValidationPipe } from '../pipes/validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../user/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParserService } from '../utilities/parser';


@Controller('/todos')
export class TodoController {

  constructor(private readonly todoService: TodoService,
              private readonly parserService: ParserService
  ) {
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getTodos(@CurrentUser()user) {
    return this.todoService.getTodos(user);
  }

  @Get(':id/find')
  @UseGuards(AuthGuard('jwt'))
  getTodo(@Param('id') id) {
    return this.todoService.findTodoById(id);
  }

  @Get('/search')
  @UseGuards(AuthGuard('jwt'))
  findTodo(@Query('text') text: string) {
    return this.todoService.searchTodo(text);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createTodo(@Body(ValidationPipe) text: TodoDto, @CurrentUser() user): Promise<TodoInterface> {
    return await this.todoService.create(text, user);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateTodo(@Param('id') id, @Body() text) {
    return this.todoService.update(id, text.text);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id) {
    return this.todoService.remove(id);
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    return await this.parserService.parse(file);
  }
}
