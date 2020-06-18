import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TodoInterface } from '../models/todo.interface';



@Injectable()

export class TodoService {

  constructor(
    @InjectModel('Todo') private todoModel: Model<TodoInterface>) {
  }


  getTodos(user) {
    return this.todoModel.find({ author: user.id }).populate('author');
  }

  findTodoById(id: string) {
    const findTodo = this.todoModel.findById(id);
    return findTodo.populate('author');
  }

  create(todo, user) {
    todo.author = user.id;
    return new this.todoModel(todo).save();
  }

  update(id, text: string): object {
    return this.todoModel.findByIdAndUpdate({ _id: id }, { text: text });
  }

  async searchTodo(text): Promise<object> {
    return this.todoModel.find({ text });
  }

  remove(id: string) {
    return this.todoModel.findByIdAndDelete(id).populate('author');
  }
}
