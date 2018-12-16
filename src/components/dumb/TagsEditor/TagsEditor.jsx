import React from 'react';
import styles from './TagsEditor.module.scss';
import {TagsCloud} from "./TagsCloud/TagsCloud";
import {FindButton} from "./FindButton/FindButton";
import {UserPlate} from "./UserPlate/UserPlate";

export const TagsEditor = props => {
  const tags = [
    {name: 'art'},
    {name: 'tabletops'},
    {name: 'netflix'},
    {name: 'games'},
    {name: 'nintendo'},
  ];

  return(
    <div className={styles.editor}>
      <UserPlate/>
      <TagsCloud tags={tags}/>
      <FindButton/>
    </div>
  );
};