import React, { useState, useMemo, useCallback, useEffect } from "react";

const POSITION = {x: 0, y: 0};

const Draggable = ({children}) => {
  const [state, setState] = useState({
    isDragging: false,
    origin: POSITION, // cusor potiion on mousedown
    translation: POSITION, // elemtn's position realtie to the origin position
  });

  const handleMouseDown = useCallback(
    ({clientX, clientY}) => {
      setState(state => ({
        ...state,
        isDragging: true, 
        origin: {x: clientX, y: clientY}
      }));
    },

    [],
  )

  const handleMouseMove = useCallback(
    ({clientX, clientY}) => {
      const translation = {x: clientX - state.origin.x, y: clientY - state.origin.y};

      setState(state => ({
        ...state,
        translation
      }));

    },
    [state.origin],
  );

  const handleMouseUp = useCallback(
    () => {
      setState(state => ({
        ...state,
        isDragging: false,
      }))
    },
    [],
  );

  useEffect(() => {
    if (state.isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      setState(state => ({...state, translation: POSITION}));
    }
  }, [state.isDragging, handleMouseMove, handleMouseUp])

  const styles = useMemo(() => ({
    cursor: state.isDragging ? '-webkit-grabbing' : '-webkit-grab',
    transform: `translate(${state.translation.x}px, ${state.translation.y}px)`,
    transition: state.isDragging ? 'none' : 'transform 500ms',
    zIndex: state.isDragging ? 2 : 1,
    position: state.isDragging   ? 'absolute' : 'relative'
  }), [state.isDragging, state.translation])

  return (
    <div style={styles} onMouseDown={handleMouseDown}>
      {children}
    </div>
  )
}

export default Draggable;