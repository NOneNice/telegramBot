import { Markup } from 'telegraf';

export const actionButtons = () => {
  return Markup.keyboard([
    Markup.button.callback('Список дел', 'list'),
    Markup.button.callback('Редактирование', 'edit'),
    Markup.button.callback('Удаление', 'delete'),
  ]);
};
