import React from 'react';
import styles from './TagsCloud.module.scss';
import {TagSmallPlate} from "../../TagSmallPlate/TagSmallPlate";
import AutosizeInput from 'react-input-autosize';
import {UserContext} from "../../../../App";

const MAX_TAGS = 8;

export const TagsCloud = props => {

  const contextUser = React.useContext(UserContext);

  const tags = contextUser.self.tags;

  const [tagInput, setTagInput] = React.useState('');

  const [addTagUiVisible, setAddTagUiVisible] = React.useState(false);

  const [editTagUiVisible, setEditTagUiVisible] = React.useState(false);

  const changeTagInput = e => e.target.value.length < 30 && setTagInput(e.target.value);

  const editTagUiShow = tag => {
    setTagInput(tag.name);
    setEditTagUiVisible(true);
  };

  const editTagUiHide = () => {
    setEditTagUiVisible(false);
  };

  const addTagUiShow = () => { setTagInput(''); setAddTagUiVisible(true) };

  const addTagUiHide = () => setAddTagUiVisible(false);

  const addNewTag = () => {
    if (
      tags.some( tag => tag.name.toLowerCase() === tagInput.toLowerCase() )
      ||
      tagInput.replace(/ /g, '').length <= 0
    ) return false;
    contextUser.updateTags([...tags, {name: tagInput.replace(/ +(?= )/g,'')}]);
    addTagUiHide();
  };

  const deleteTag = () => {
    const target = tags.find( tag => tag.name === tagInput);
    const index = tags.indexOf(target);
    const newTagsArr = [...tags];
    newTagsArr.splice(index, 1);
    contextUser.updateTags(newTagsArr);
    editTagUiHide();
  };

  return(
    tags ?
      <div className={styles.tagsCloud}>
        {
          tags.map( (tag, index) =>
              <span onClick={ () => editTagUiShow(tag) }>
          <TagSmallPlate key={index} {...tag} index={index}/>
        </span>
          )
        }
        {
          tags.length < MAX_TAGS
          &&
          <span onClick={ addTagUiShow }>
        <TagSmallPlate type={'add'} name={'add tag'} index={tags.length}/>
      </span>
        }
        {
          (addTagUiVisible || editTagUiVisible)
          &&
          <div className={styles.addTagContainer}>
            <div onClick={ addTagUiVisible ? addTagUiHide : editTagUiHide } className={styles.bg}/>
            <div className={styles.addTagContent}>
              <AutosizeInput
                placeholder={'tag'}
                value={tagInput}
                onChange={ changeTagInput }
                disabled={ editTagUiVisible }
              />
              <div style={{opacity: tagInput.length !== 0 ? '1' : '0'}} className={styles.addTagControls}>
                <button onClick={ deleteTag } className={`${styles.addTagButton} ${styles.delete}`}>delete</button>
                { addTagUiVisible && <button onClick={ addNewTag } className={styles.addTagButton}>add</button> }
              </div>
            </div>
          </div>
        }
      </div>
      :
      'loading...'
  );
};
