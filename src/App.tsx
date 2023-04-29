import { useEffect } from 'react';
import { isChrome, isFirefox } from 'react-device-detect';

import building from './assets/images/buildings.png';

type ScrollEvent = WheelEvent & { wheelDeltaY: number };

const isTrackpadScroll = (event: WheelEvent) => {
  const absWheelDeltaY = Math.abs((event as ScrollEvent).wheelDeltaY);
  if (isFirefox) {
    return event.deltaMode === 0;
  } else if (isChrome) {
    return absWheelDeltaY % 120 !== 0;
  } else {
    return false;
  }
};

const transformScroll = (event: WheelEvent) => {
  const container = document.getElementById('container') as HTMLElement;
  if (!isTrackpadScroll(event)) {
    const offset = isFirefox ? 15 : 1;
    container.scrollLeft += event.deltaY * offset;
  }
};

const App = (): JSX.Element => {
  useEffect(() => {
    // Add wheel event listener to the container
    const containerRef = document.getElementById('container') as HTMLElement;
    containerRef.addEventListener('wheel', transformScroll, { passive: false });

    // Cleanup and remove event listener on unmount
    return () => {
      containerRef.removeEventListener('wheel', transformScroll);
    };
  }, []);

  return (
    <div
      id="container"
      className="fixed w-screen h-screen overflow-hidden overflow-x-scroll scrollbar-hide"
    >
      <img src={building} alt="buildings" className="h-full max-w-none" />
    </div>
  );
};

export default App;
