import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CommonService } from './common.service';
import { BookSchema, Book } from './schemas/book.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([
                { name: Book.name, schema: BookSchema }
            ]
        )
    ],
    controllers: [BooksController],
    providers: [BooksService, CommonService],
    exports: [BooksService]
})

export class BooksModule {}