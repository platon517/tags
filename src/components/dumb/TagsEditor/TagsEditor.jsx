import React from 'react';
import styles from './TagsEditor.module.scss';
import {TagsCloud} from "./TagsCloud/TagsCloud";
import {FindButton} from "./FindButton/FindButton";
import {UserPlate} from "./UserPlate/UserPlate";

export const TagsEditor = () => {
  return(
    <div className={styles.editor}>
      <UserPlate/>
      <TagsCloud/>
      <FindButton/>
    </div>
  );
};