import React, { useCallback, FormEventHandler, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TestForm, TestVariantButton } from 'entities/Test';
import { TextToSourceVariants } from '../../model';
import { styled } from '@mui/material';

const VariantsContainer = styled(Box)(({ theme }) => ({
    display: 'grid',
    width: '100%',
    gap: theme.spacing(1),
    gridTemplateColumns: '1fr 1fr',
    marginBlockEnd: theme.spacing(2),
    marginBlockStart: theme.spacing(2),
}));

export interface TextToSourceProps<T = TextToSourceVariants> {
  test: T;
  // @ts-ignore
  onCommit: (...args: Parameters<T["commit"]>) => void;
}

const RESULT_FIELD_NAME = 'answer';

export const TextToSource = ({
  test,
  onCommit,
}: TextToSourceProps) => {
  const [selectedValue, setSelectedValue] = useState<string|undefined>();
  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const answer = formData.get(RESULT_FIELD_NAME).toString();
    onCommit(answer);
  }, [onCommit]);
  console.log(selectedValue)
  
  return (
    <TestForm
    onSubmit={onSubmit}
    onChange={e => { 
      if('value' in e.target && typeof e.target.value === 'string') {
        setSelectedValue(e.target.value);
      }
    }}
    testTitle={test.title}
    question={<>&laquo;{test.question}&raquo;</>}
    submitButton={<Button size='large' disabled={typeof selectedValue === 'undefined'} variant='contained' type="submit">Проверить</Button>}
    >
      <VariantsContainer>
        {test.options.map((variant) => (
          <TestVariantButton selected={selectedValue === variant.value} name={RESULT_FIELD_NAME} key={variant.value} {...variant}>{variant.label}</TestVariantButton>
        ))}
      </VariantsContainer>
    </TestForm>
  );
};
