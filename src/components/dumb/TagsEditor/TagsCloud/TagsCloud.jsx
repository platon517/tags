import React from 'react';
import styles from './TagsCloud.module.scss';
import {TagSmallPlate} from "../../TagSmallPlate/TagSmallPlate";
import AutosizeInput from 'react-input-autosize';

const MAX_TAGS = 8;

export const TagsCloud = props => {

  const [tagInput, setTagInput] = React.useState('');

  const [addTagUiVisible, setAddTagUiVisible] = React.useState(false);

  const changeTagInput = e => e.target.value.length < 30 && setTagInput(e.target.value);

  const addTagUiShow = () => setAddTagUiVisible(true);

  const addTagUiHide = () => setAddTagUiVisible(false);

  return(
    <div className={styles.tagsCloud}>
      {
        props.tags.map( (tag, index) => <TagSmallPlate key={index} {...tag} index={index}/>)
      }
      {
        props.tags.length < MAX_TAGS
        &&
        <span onClick={ addTagUiShow }>
          <TagSmallPlate type={'add'} name={'add tag'} index={props.tags.length}/>
        </span>
      }
      {
        addTagUiVisible
        &&
        <div className={styles.addTagContainer}>
          <div className={styles.addTagContent}>
            <AutosizeInput
              placeholder={'new tag'}
              value={tagInput}
              onChange={ changeTagInput }
            />
            <div style={{opacity: tagInput.length !== 0 ? '1' : '0'}} className={styles.addTagControls}>
              <button onClick={ addTagUiHide } className={`${styles.addTagButton} ${styles.delete}`}>delete</button>
              <button className={styles.addTagButton}>add</button>
            </div>
          </div>
        </div>
      }
    </div>
  );
};