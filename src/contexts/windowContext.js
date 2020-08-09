import React, { useContext, useState } from 'react';

const WindowContext = React.createContext(undefined);

export const useWindowContext = () => useContext(WindowContext);

function WindowProvider(props) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const setDimensions = () => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
  };

  window.addEventListener('resize', setDimensions);

  return (
    <WindowContext.Provider value={{ windowWidth, windowHeight }}>
      {props.children}
    </WindowContext.Provider>
  );
}

export { WindowContext, WindowProvider };
