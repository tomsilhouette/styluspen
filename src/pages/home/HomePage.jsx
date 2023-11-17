import React, { useContext, useEffect } from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import { ToggleContext } from '../../context/ToggleContext';
import CanvasComponent from '../../components/canvas/CanvasComponent';

function HomePage() {
  const { setActiveNav } = useContext(ToggleContext);

  useEffect(() => {
    setActiveNav('/');
  }, []);

  return (
    <div className='grid main__bg font-poppins h-screen grid-rows-reg max-h-screen'>
      <Navbar />
      {/* Main */}
      <main className='grid h-full p-1 items-center justify-center'>
        <CanvasComponent />
      </main>
    </div>
  );
}

export default HomePage;
