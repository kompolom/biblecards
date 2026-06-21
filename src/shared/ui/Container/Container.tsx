import { Box, styled } from '@mui/material';
import { cssToken } from '../../css-token';

export const ContainerTokens = {
  Width: cssToken('container', 'dimension', 'width'),
  Offset: cssToken('container', 'dimension', 'offset'),
};

export const Container = styled(Box, { name: 'container' })({
  marginLeft: 'auto',
  marginRight: 'auto',
  boxSizing: 'border-box',
  containerType: 'inline-size',
  maxWidth: ContainerTokens.Width('100%'),
  paddingInlineStart: ContainerTokens.Offset(),
  paddingInlineEnd: ContainerTokens.Offset(),
});
