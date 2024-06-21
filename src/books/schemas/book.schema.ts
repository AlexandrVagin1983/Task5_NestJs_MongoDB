import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { User } from './user.schema';

export type BookDocument = Book & Document;

@Schema()
export class Book {
    @Prop({ required: true })
    public title: string;

    @Prop()
    public description: string;

    @Prop()
    public text: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    user: User;

}

export const BookSchema = SchemaFactory.createForClass(Book);
