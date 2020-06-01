import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TodoInterface } from '../models/todo.interface';


@Injectable()

export class TodoService {
  constructor(@InjectModel('Todo') private todoModel: Model<TodoInterface>) {
  }


  getTodos() {
      return this.todoModel.find();
  }

  findTodoById(id: string): any {
    return this.todoModel.findById(id);
  }

  create(todo) {
    const newTodo = new this.todoModel(todo);
    return newTodo.save();
  }

  update(id, text: string): any {
    return this.todoModel.findByIdAndUpdate({ _id: id }, { text: text });
  }

  async searchTodo(text) {
    return this.todoModel.find({ text });
  }

  remove(id: string) {
    return this.todoModel.findByIdAndDelete(id);
  }
}
