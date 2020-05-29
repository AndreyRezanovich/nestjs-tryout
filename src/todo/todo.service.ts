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

  update(id, text: string): any {
    return this.todoModel.findByIdAndUpdate({ _id: id }, { text: text });
  }

  searchTodo() {
    return this.todoModel.find();
  }

  remove(id: string) {
    return this.todoModel.findByIdAndDelete(id);
  }

}
