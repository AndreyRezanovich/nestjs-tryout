import {Document, mongoose} from "mongoose";

export interface TodoInterface extends Document {
    text: string,
}
