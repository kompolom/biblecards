import { IRoute } from 'shared/routes';

export const routes: Readonly<IRoute[]> = [
  { path: '/game', title: 'Процитируй текст'},
  { path: '/', title: 'Начало'},
  { path: '/add', title: 'Добавить стих'},
  { path: '/list', title: 'Список стихов' },
];