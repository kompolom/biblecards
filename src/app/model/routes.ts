import { IRoute } from 'shared/routes';

export const routes: Readonly<IRoute[]> = [
  { path: '/game', title: 'Процитируй текст', showInMenu: true },
  { path: '/', title: 'Начало', showInMenu: true },
  { path: '/add', title: 'Добавить стих', showInMenu: true },
  { path: '/list', title: 'Список стихов', showInMenu: true },
  { path: '/edit/:id', title: 'Редактировать стих' }
];