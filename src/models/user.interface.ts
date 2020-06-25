import { Document } from 'mongoose';

export interface UserInterface extends Document {
  _id: string;
  login: string;
  password: string;
}
