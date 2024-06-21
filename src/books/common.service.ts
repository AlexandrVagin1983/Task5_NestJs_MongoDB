import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { BooksService } from './books.service';

@Injectable()
export class CommonService {
    constructor(
        @Inject(forwardRef(() => BooksService))
        private readonly booksService: BooksService
    ) {

    }
}