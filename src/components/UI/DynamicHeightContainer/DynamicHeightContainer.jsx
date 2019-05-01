import React from "react";
import styles from "./DynamicHeightContainer.module.scss"

export const DynamicHeightContainer = props => {

  const container = React.useRef(null);

  const [dynamicHeightDelta, setDynamicHeightDelta] = React.useState(0);
  const [isVertical, setIsVertical] = React.useState(window.innerHeight > window.innerWidth);

  React.useEffect(() => {
    heightChange();
  }, []);

  const heightChange = () => {
    if (container.current) {
      const newDelta = Math.abs(container.current.getBoundingClientRect().top);
      if (dynamicHeightDelta !== newDelta) console.log('new height!');
      setDynamicHeightDelta(newDelta);
      setIsVertical(window.innerHeight > window.innerWidth);
    }
    setTimeout(heightChange, 100);
    // Ios keyboard is moving the entire window with keyboard height. To pose things right, I used this function.
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
      {!isVertical && <div className={styles.useVertical}>
        <p>Use the <b>mobile device</b> with <b>vertical orientation</b> to open this app</p>
      </div>}
      {props.children }
    </div>
  );
};