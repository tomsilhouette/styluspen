import React, { useEffect, useRef, useCallback } from 'react';

function CanvasComponent() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  let isDrawing = false; // Declare isDrawing here

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

  const startDrawing = useCallback((e) => {
    isDrawing = true;
    const x = e.clientX - canvasRef.current.offsetLeft;
    const y = e.clientY - canvasRef.current.offsetTop;

    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
  }, []);

  const draw = useCallback((e) => {
    if (!isDrawing) return;
    const x = e.clientX - canvasRef.current.offsetLeft;
    const y = e.clientY - canvasRef.current.offsetTop;

    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  }, []);

  const stopDrawing = useCallback(() => {
    isDrawing = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch events
    canvas.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      const x = touch.clientX - canvas.offsetLeft;
      const y = touch.clientY - canvas.offsetTop;

      contextRef.current.beginPath();
      contextRef.current.moveTo(x, y);
    });

    canvas.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      const x = touch.clientX - canvas.offsetLeft;
      const y = touch.clientY - canvas.offsetTop;

      contextRef.current.lineTo(x, y);
      contextRef.current.stroke();
    });

    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);

      // Touch events
      canvas.removeEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        const x = touch.clientX - canvas.offsetLeft;
        const y = touch.clientY - canvas.offsetTop;

        contextRef.current.beginPath();
        contextRef.current.moveTo(x, y);
      });

      canvas.removeEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        const x = touch.clientX - canvas.offsetLeft;
        const y = touch.clientY - canvas.offsetTop;

        contextRef.current.lineTo(x, y);
        contextRef.current.stroke();
      });

      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [startDrawing, draw, stopDrawing]);

  return <canvas ref={canvasRef} />;
}

export default CanvasComponent;
