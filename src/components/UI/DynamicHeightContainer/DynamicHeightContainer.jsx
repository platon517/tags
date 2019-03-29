import React from "react";
import styles from "./DynamicHeightContainer.module.scss"

export const DynamicHeightContainer = props => {

  const container = React.useRef(null);

  const [dynamicHeightDelta, setDynamicHeightDelta] = React.useState(0);

  React.useEffect(() => {
    heightChange();
  }, []);

  const heightChange = () => {
    if (container.current) {
      const newDelta = Math.abs(container.current.getBoundingClientRect().top);
      if (dynamicHeightDelta !== newDelta) console.log('new height!');
      setDynamicHeightDelta(newDelta);
    }
    setTimeout(heightChange, 100); // ios keyboard padding
  };

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
      { props.children }
    </div>
  );
};