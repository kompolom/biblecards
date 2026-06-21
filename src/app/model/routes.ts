import { IRoute } from 'shared/routes';
import {
  Home,
  PlayArrow,
  TrendingUp,
  Add,
  FormatListBulleted,
} from '@mui/icons-material';

export const routes: Readonly<IRoute[]> = [
  { path: '/', title: 'Начало', showInMenu: true, icon: Home },
  {
    path: '/game',
    title: 'Процитируй текст',
    showInMenu: true,
    icon: PlayArrow,
  },
  { path: '/progress', title: 'Прогресс', showInMenu: true, icon: TrendingUp },
  {
    path: '/list',
    title: 'Список стихов',
    showInMenu: true,
    icon: FormatListBulleted,
  },
  { path: '/add', title: 'Добавить стих', showInMenu: true, icon: Add },
  { path: '/edit/:id', title: 'Редактировать стих' },
];
