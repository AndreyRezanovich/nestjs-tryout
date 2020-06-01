import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TodoInterface } from '../models/todo.interface';


@Injectable()

export class TodoService {
  constructor(@InjectModel('Todo') private todoModel: Model<TodoInterface>) {
  }


  getTodos() {
    try {
      return this.todoModel.find();
    } catch (err) {
      console.log('getTodos failed', err);
    }
  }

  findTodoById(id: string): any {
    return this.todoModel.findById(id);
  }

  create(todo) {
    try {
      const newTodo = new this.todoModel(todo);
      return newTodo.save();
    } catch (err) {
      console.log('create failed', err);
    }
  }

  update(id, todo): any {
    return this.todoModel.findByIdAndUpdate({ _id: id }, todo);
  }

  async searchTodo(text) {
    const foundTodos = await this.todoModel.find({ text });
    console.log(foundTodos);
    return foundTodos;
  }

  remove(id: string) {
    return this.todoModel.findByIdAndDelete(id);
  }

}
