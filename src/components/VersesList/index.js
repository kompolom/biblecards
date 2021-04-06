
import { List } from '@material-ui/core';
import React from 'react';
import { Card } from '../Card';
import { VerseEditing } from '../VerseEditing';

export function VersesList(props) {
  return (
    <List>
      {
        props.verses.map(verse => {
          const stats = props.stats[verse.id]
          return (
            <li key={verse.source} className="ListItem">
              <Card stats={stats} view="list" verse={verse} />
              <VerseEditing id={verse.id} stats={stats}/>
            </li>
          );
        })
      }
    </List>
  )
};