import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TodoInterface } from '../models/todo.interface';


@Injectable()

export class TodoService {

  constructor(@InjectModel('Todo') private todoModel: Model<TodoInterface>) {
  }


  getTodos(user) {
    return this.todoModel.find({author: user.login});
  }

  findTodoById(id: string): any {
    return this.todoModel.findById(id);
  }

  create(todo, user) {
    // console.log(user);
    todo.author = user.login;
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
