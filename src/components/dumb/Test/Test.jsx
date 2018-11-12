import React from 'react';
import styles from './Test.module.scss';

export const Test = props => {

  let [value, setValue] = React.useState(0);

  React.useEffect(() => {
    console.log('update')
  }, []);

  return(
    <>
      <div className={styles.test}>{value}</div>
      <button onClick={() => setValue(value += 1)}>test</button>
    </>
  );
};