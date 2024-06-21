import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CommonService } from "./common.service";
import { Model, Connection, HydratedDocument, QueryWithHelpers } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Book, BookDocument } from "./schemas/book.schema";
import { CreateBookDto } from './interfaces/dto/create-book';
import { UpdateBookDto } from './interfaces/dto/update-book';

@Injectable()
export class BooksService {
    constructor(
        @InjectModel(Book.name) private BookModel: Model<BookDocument>,
        @InjectConnection() private connection: Connection,
    ) {}

    //Добавляет новую книгу в массив
    public create(data: CreateBookDto): Promise<BookDocument> {
        const book = new this.BookModel(data);
        return book.save();
    }

    //Возвращает массив всех книг
    public getAll(): Promise<BookDocument[]> {
        return this.BookModel.find().exec();
    }

    //Обновляет книгу по айди
    public update(id: string, data: UpdateBookDto): QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument> {
        return this.BookModel.findOneAndUpdate(
            { _id: id },
            data,
        );
    }

    //удаляет книгу в бд:
    public delete(id: string): QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument> {
        return this.BookModel.findOneAndDelete({ _id: id });
    }

}