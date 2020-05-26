import { Document } from 'mongoose';

export interface TodoInterface extends Document {
  text: string;
  checked: boolean;
}
