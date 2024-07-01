import React, { useState, useRef } from "react";

const TableSlider = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);

  const sliderRef = useRef(null);

  const startDragging = (e) => {
    setIsDragging(true);
    setStartPosition(e.clientX);
    setStartScrollLeft(sliderRef.current.scrollLeft);

    document.addEventListener("mousemove", handleDragging);
    document.addEventListener("mouseup", stopDragging);
  };

  const handleDragging = (e) => {
    if (!isDragging) return;

    const currentX = e.clientX;
    const deltaX = currentX - startPosition;
    sliderRef.current.scrollLeft = startScrollLeft - deltaX;
  };

  const stopDragging = () => {
    setIsDragging(false);
    document.removeEventListener("mousemove", handleDragging);
    document.removeEventListener("mouseup", stopDragging);
  };

  return (
    <div className="table-slider-container">
      <div className="table-slider" onMouseDown={startDragging} ref={sliderRef}>
        {children.map((child, index) => (
          <div key={index} className="table-slide">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSlider;
