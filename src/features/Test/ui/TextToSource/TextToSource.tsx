import React, { useCallback, FormEventHandler, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TestForm, TestVariantButton, ITestProps } from 'entities/Test';
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

export interface TextToSourceProps extends ITestProps {
  test: TextToSourceVariants;
}

const RESULT_FIELD_NAME = 'answer';

export const TextToSource = ({ test, onComplete }: TextToSourceProps) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>();
  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const answer = formData.get(RESULT_FIELD_NAME).toString();
      const result = await test.commit(answer);
      onComplete(result);
    },
    [test, onComplete],
  );

  return (
    <TestForm
      onSubmit={onSubmit}
      onChange={(e) => {
        if ('value' in e.target && typeof e.target.value === 'string') {
          setSelectedValue(e.target.value);
        }
      }}
      testTitle={test.title}
      question={<>&laquo;{test.question}&raquo;</>}
      submitButton={
        <Button
          size="large"
          disabled={typeof selectedValue === 'undefined'}
          variant="contained"
          type="submit"
        >
          Проверить
        </Button>
      }
    >
      <VariantsContainer>
        {test.options.map((variant) => (
          <TestVariantButton
            selected={selectedValue === variant.value}
            name={RESULT_FIELD_NAME}
            key={variant.value}
            {...variant}
          >
            {variant.label}
          </TestVariantButton>
        ))}
      </VariantsContainer>
    </TestForm>
  );
};
