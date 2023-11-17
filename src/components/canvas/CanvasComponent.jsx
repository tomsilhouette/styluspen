import React, { useEffect, useRef } from 'react';

function CanvasComponent() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas height
    const width = window.innerWidth;
    const height = window.innerHeight - 60;
    canvas.width = width;
    canvas.height = height;

    context.scale(1, 1);
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 2;

    // Set background color
    context.fillStyle = 'lightgray'; // Change 'lightgray' to your desired color
    context.fillRect(0, 0, canvas.width, canvas.height);

    contextRef.current = context;
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Clear the entire canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Set background color again after clearing
    context.fillStyle = 'lightgray'; // Change 'lightgray' to your desired color
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleTouchStart = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const touch = e.touches[0];
    const x = touch.clientX - canvas.offsetLeft;
    const y = touch.clientY - canvas.offsetTop;

    context.beginPath();
    context.moveTo(x, y);
  };

  const handleTouchMove = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const touch = e.touches[0];
    const x = touch.clientX - canvas.offsetLeft;
    const y = touch.clientY - canvas.offsetTop;

    context.lineTo(x, y);
    context.stroke();
  };

  const handleTouchEnd = () => {
    // Additional touch-end logic if needed
  };

  return (
    <canvas
      ref={canvasRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    />
  );
}

export default CanvasComponent;
