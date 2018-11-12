import React from 'react';
import styles from './SearchPlate.module.scss';
import {TagSmallPlate} from "../TagSmallPlate/TagSmallPlate";

export const SearchPlate = props => {
  const { tags } = props;

  const testTags = [
    {name: 'art'},
    {name: 'tabletops'},
    {name: 'netflix'},
    {name: 'games'},
    {name: 'nintendo'},
  ];

  return(
    <div className={styles.searchPlate}>
      <div className={styles.tags}>
        <span className={styles.tags_container}>
          {
            testTags.map( (item, index) => <TagSmallPlate {...item} index={index}/> )
          }
        </span>
      </div>
    </div>
  );
};