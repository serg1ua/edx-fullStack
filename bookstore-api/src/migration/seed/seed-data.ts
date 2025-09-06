import { v4 as uuid } from 'uuid';
import { Book } from '../../book/book.entity';

export const BOOKS: Book[] = [
  {
    id: uuid(),
    isbn: '9780316769488',
    author: 'J. D. Salinger',
    title: 'The Catcher in the Rye',
  },
  {
    id: uuid(),
    isbn: '9786070728792',
    author: 'Gabriel García Márquez',
    title: 'Cien a\u00D1os de soledad',
  },
  {
    id: uuid(),
    isbn: '9782070368051',
    author: 'Jean-Paul Sartre',
    title: 'La Naus\u00e1e',
  },
  {
    id: uuid(),
    isbn: '9780385474542',
    author: 'Chinua Achebe',
    title: 'Things Fall Apart',
  },
  {
    id: uuid(),
    isbn: '9781853261008',
    author: 'Hans Christian Andersen',
    title: 'Fairy tales',
  },
  {
    id: uuid(),
    isbn: '9780679433132',
    author: 'Dante Alighieri',
    title: 'The Divine Comedy',
  },
  {
    id: uuid(),
    isbn: '9780140441000',
    author: 'Unknown',
    title: 'The Epic Of Gilgamesh',
  },
  {
    id: uuid(),
    isbn: '9780060969592',
    author: 'Unknown',
    title: 'The Book Of Job',
  },
  {
    id: uuid(),
    isbn: '9780307958860',
    author: 'Unknown',
    title: 'One Thousand and One Nights',
  },
  {
    id: uuid(),
    isbn: '9780140447699',
    author: 'Unknown',
    title: "Njá\u00e1l''s Saga",
  },
  {
    id: uuid(),
    isbn: '9780007350773',
    author: 'Jane Austen',
    title: 'Pride and Prejudice',
  },
  {
    id: uuid(),
    isbn: '9782701161570',
    author: 'Honor\u00e9 de Balzac',
    title: 'Le P\u00e8re Goriot',
  },
  {
    id: uuid(),
    isbn: '9780802144478',
    author: 'Samuel Beckett',
    title: 'Molloy, Malone Dies, The Unnamable, the trilogy',
  },
];
