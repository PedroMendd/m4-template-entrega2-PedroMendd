import { booksDatabase, generateBookId } from "../database/database";
import { IBook, TBookBody, TBookPartial } from "../interfaces/books.interface";

interface IBooksServices {
  create(body: TBookBody): IBook;
  getMany(search?: string, name?: string): IBook[];
  getOne(id: string): IBook;
  update(body: TBookPartial, id: string): IBook;
  delete(id: string): void;
}

export class BooksServices implements IBooksServices {
  create(body: TBookBody): IBook {
    const date = new Date();

    const newBook: IBook = {
      id: generateBookId(),
      name: body.name,
      pages: body.pages,
      category: body.category,
      createdAt: date,
      updatedAt: date,
    };

    booksDatabase.push(newBook);

    return newBook;
  }

  getMany(search?: string, name?: string): IBook[] {
    return booksDatabase.filter((book) => {
      if (!search) return true;
      const searchTerm = search.toLowerCase();
      return (
        book.name.toLowerCase().includes(searchTerm) ||
        book.category?.toLowerCase().includes(searchTerm)
      );
    });
  }

  getOne(id: string): IBook {
    const book = booksDatabase.find((book) => book.id === Number(id)) as IBook;
    return book;
  }

  update(body: Partial<TBookBody>, id: string): IBook {
    const currentBook = booksDatabase.find(
      (book) => Number(book.id) === Number(id)
    ) as IBook;
    const date = new Date();

    const newBook = { ...currentBook, ...body, updatedAt: date };
    const index = booksDatabase.findIndex((book) => book.id === Number(id));

    booksDatabase.splice(index, 1, newBook);

    return newBook;
  }

  delete(id: string): void {
    const index = booksDatabase.findIndex((book) => book.id === Number(id));

    booksDatabase.splice(index, 1);
  }
}
