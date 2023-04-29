import { useEffect } from 'react';
import { isChrome, isFirefox } from 'react-device-detect';

import building from './assets/images/buildings.png';

const isTrackpadScroll = (event) => {
  const absWheelDeltaY = Math.abs(event.wheelDeltaY)
  if (isFirefox) {
    return event.deltaMode === 0;
  } else if (isChrome) {
    return absWheelDeltaY % 120 !== 0;
  } else {
    return false;
  }
}

const transformScroll = (event) => {
  const container = document.getElementById('container');
  if (!isTrackpadScroll(event)) {
    const offset = isFirefox ? 15 : 1;
    container.scrollLeft += (event.deltaY * offset);
  }
}

function App() {
  useEffect(() => {
    // Add wheel event listener to the container
    const containerRef = document.getElementById('container');
    containerRef.addEventListener('wheel', transformScroll, { passive: false });

    // Cleanup and remove event listener on unmount
    return () => {
      containerRef.removeEventListener('wheel', transformScroll);
    };
  }, []);

  return (
    <div id="container" className="fixed w-screen h-screen overflow-hidden overflow-x-scroll scrollbar-hide">
      <img src={building} alt="buildings" className="h-full max-w-none" />
    </div>
  );
}

export default App;
