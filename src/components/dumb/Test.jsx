import React from 'react';

export const Test = React.memo(props => {

  const [test, setTest] = React.useState(1);

  console.log('test-render');

  const change = () => setTest(test + 1);

  return(
    <div onClick={change}>
      {test}
    </div>
  );
});