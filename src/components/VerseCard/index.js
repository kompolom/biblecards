import React from 'react';
import Card from '@mui/material/Card'
import { CardContent, CardActions, Typography } from '@mui/material';

export const VerseCard = (props) => {
    return (
    <Card onClick={props.onToggle}>
        <CardContent>
            <Typography align="center" variant='h6'>{props.verse.text}</Typography>
            <Typography align="right" variant="h6" color="text.secondary">{props.verse.source}</Typography>
        {props.stats}
        </CardContent>
        {props.actions? (<CardActions sx={{justifyContent: 'flex-end'}}>{props.actions}</CardActions>): null}
    </Card>
    )
}

export * from './withToggle';