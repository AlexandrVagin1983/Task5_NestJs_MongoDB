import { Controller, Get, Post, Put, Param, Delete, Body } from '@nestjs/common';
import { BooksService } from './books.service';

import { BookDocument } from './schemas/book.schema';
import { HydratedDocument, QueryWithHelpers } from 'mongoose';

import { IParamId } from './interfaces/param-id';
import { CreateBookDto } from './interfaces/dto/create-book';
import { UpdateBookDto } from './interfaces/dto/update-book';

@Controller('books')
export class BooksController {
    constructor(private readonly BooksService: BooksService) {}
    
    //Добавляет новую книгу:
      @Post()
    public create(@Body() body: CreateBookDto): Promise<BookDocument> {
        return this.BooksService.create(body);
    }
    
    //Возвращает список всех книг:
    @Get()
    public getAll(): Promise<BookDocument[]> {
        return this.BooksService.getAll();
    }

    //обновляет книгу по id:
    @Put(':id')
    public update(
        @Param() { id }: IParamId,
        @Body() body: UpdateBookDto,
    ): QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument> {
        return this.BooksService.update(id, body);
    }

    @Delete(':id')
    public delete(@Param() { id }: IParamId): QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument> {
        return this.BooksService.delete(id);
    }

}