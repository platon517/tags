import React from "react";
import styles from "./DynamicHeightContainer.module.scss"

export const DynamicHeightContainer = props => {

  const container = React.createRef();

  const [height, setHeight] = React.useState(0);
  const [dynamicHeightDelta, setDynamicHeightDelta] = React.useState(0);

  React.useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  const heightChange = () => {
    if (container.current) {
      const newDelta = Math.abs(container.current.getBoundingClientRect().top);
      if (dynamicHeightDelta !== newDelta) console.log('new height!');
      setDynamicHeightDelta(newDelta);
    }
  };

  setTimeout(() => requestAnimationFrame(heightChange), 100); // ios keyboard padding

  return(
    <div
      ref={container}
      className={styles.container}
      style={
        dynamicHeightDelta ?
          {
            height: `${height - dynamicHeightDelta}px`,
            paddingTop: `${dynamicHeightDelta}px`
          }
          :
          {}
      }
    >
      { props.children }
    </div>
  );
};