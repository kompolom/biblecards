import { styled } from "@mui/material";
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';

export const TextField = styled(MuiTextField)<TextFieldProps>(() => ({
    marginBottom: '30px'
}))