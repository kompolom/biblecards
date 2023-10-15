import React from 'react';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { BookSelect, useBible } from 'entities/Bible';
import { IVerse } from 'entities/Verse';

import {
  validation_schema,
  VerseFormFields,
  verseToForm,
  formToVerse,
} from '../../model';
import { TextField } from './TextField';
import './style.css';
import { useSaveVerse } from 'features/Verse/model/useSaveVerse';

export interface VerseFormProps {
  verse?: IVerse;
}

export const VerseForm = (props: VerseFormProps) => {
  const saveVerse = useSaveVerse();
  const bible = useBible();
  const formik = useFormik<VerseFormFields>({
    enableReinitialize: true,
    initialValues: props.verse
      ? verseToForm(props.verse, bible)
      : {
          book: 1,
          chapter: '',
          number: '',
          text: '',
        },
    validationSchema: validation_schema,
    onSubmit: async (values) => {
      const verse = formToVerse(values, bible);
      // TODO: add alerts
      await saveVerse(verse).unwrap();
      formik.setSubmitting(false);
    },
  });

  return (
    <Box component="form" sx={{ m: 1 }} onSubmit={formik.handleSubmit}>
      <div className="VerseForm-body VerseForm-row">
        <BookSelect
          sx={{ width: '100%', mb: '30px' }}
          native
          bible={bible}
          error={Boolean(formik.touched.chapter && formik.errors.chapter)}
          value={formik.values.book}
          onChange={(e) => {
            formik.setFieldValue('book', Number(e.target.value))
          }
          }
        />
        <TextField
          className="VerseForm-row"
          type="number"
          inputProps={{
            min: 1,
            max: 150,
          }}
          label="Глава"
          error={Boolean(formik.touched.chapter && formik.errors.chapter)}
          helperText={formik.touched.chapter && formik.errors.chapter}
          {...formik.getFieldProps('chapter')}
        />
        <TextField
          className="VerseForm-row"
          type="number"
          label="Стих"
          inputProps={{ min: 1 }}
          error={Boolean(formik.touched.number && formik.errors.number)}
          helperText={formik.touched.number && formik.errors.number}
          {...formik.getFieldProps('number')}
        />
        <TextField
          label="Текст стиха"
          multiline
          rows={4}
          error={Boolean(formik.touched.text && formik.errors.text)}
          helperText={formik.touched.text && formik.errors.text}
          {...formik.getFieldProps('text')}
        />
      </div>
      <div className="VerseForm-row VerseForm-SubmitSection">
        <Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting}>
          {props.verse ? 'Сохранить' : 'Добавить'}
        </Button>
      </div>
    </Box>
  );
};
