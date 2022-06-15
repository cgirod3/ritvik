import React, { useEffect } from 'react';

import '../styles/containers/Home.css';

const Home = () => {

  useEffect(() => {
    const homeDiv = document.getElementsByClassName('Home')[0];
    const transformScroll = (event) => {
      console.log('\n\n\nevent', event);
      if (!event.deltaY) {
        return;
      }

      homeDiv.scrollLeft += event.deltaY;
    }

    const element = document.scrollingElement || document.documentElement;
    element.addEventListener('wheel', transformScroll);

    return () => {
      element.removeEventListener('wheel', transformScroll);
    };
  }, []);

  return (
    <div className='Home'>
      <h3>PRINT</h3>
      <h3>STILL</h3>
      <h3>MOVING</h3>
      <h3>SOUND</h3>
      <h3>SOUL</h3>
    </div>
  );
};

export default Home;
