import { BOOKS } from './seed-data';
import { dataSource } from '../../../data-source';

async function seed(): Promise<void> {
  await dataSource.initialize();

  try {
    for (const { id, isbn, author, title } of BOOKS) {
      await dataSource.manager.query(
        `INSERT INTO book (id, isbn, author, title) VALUES ('${id}', '${isbn}','${author}', '${title}')`,
      );
    }
  } catch (err) {
    console.log('Failed to insert books', err);
  }
}

void seed();
