import List from '@mui/material/List';
import React from 'react';
import { VerseCard } from '../VerseCard';
import { VerseEditing } from '../VerseEditing';
import { VerseStatistics } from '../VerseStatistics';

export function VersesList(props) {
  return (
    <List>
      {props.verses.map((verse) => {
        const stats = props.stats[verse.id];
        return (
          <li key={verse.source} className="ListItem">
            <VerseCard
            /*
              stats={
                <VerseStatistics
                  view={props.stats[0]}
                  correct={props.stats[1]}
                  incorrect={props.stats[2]}
                />
              }
              */
              verse={verse}
              actions={<VerseEditing id={verse.id} stats={stats} />}
            />
          </li>
        );
      })}
    </List>
  );
}
