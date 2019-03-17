import React from "react";
import styles from "./DynamicHeightContainer.module.scss"

export const DynamicHeightContainer = props => {

  const container = React.useRef(null);

  const [dynamicHeightDelta, setDynamicHeightDelta] = React.useState(0);

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
        {
          height: `${window.innerHeight}px`,
          paddingTop: `${dynamicHeightDelta}px`
        }
      }
    >
      <div style={{position: 'absolute', top: 0, left: 0, zIndex: 1000, color: 'black'}}>
        {`${window.innerHeight}`}
      </div>
      <div style={{position: 'absolute', top: 0, right: 0, zIndex: 1000, color: 'black'}}>
        {`${dynamicHeightDelta}`}
      </div>
      { props.children }
    </div>
  );
};