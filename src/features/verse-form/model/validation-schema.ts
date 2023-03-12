import { object, number, string } from 'yup';
import { VerseFormFields } from './VerseFormFields';

export const validation_schema = object<VerseFormFields>().shape({
    book: number().transform(v => isNaN(v)? undefined: v).required(),
    chapter: number().notRequired(),
    number: string().required('Укажите номер стиха'),
    text: string().required('Введите текст стиха')
})