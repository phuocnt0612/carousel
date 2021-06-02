import { useCallback, useState } from 'react';
import { isTouchEvent } from '~/utils/helpers';

interface Props {
  mouseDownCb?: (e) => any;
  mouseMoveCb?: (e) => any;
  dragEndCb?: (e) => any;
  startOffset?: { startX?: number; startY?: number };

  [key: string]: any;
}

export function useDrag({ mouseDownCb, mouseMoveCb, dragEndCb, startOffset = { startX: 0, startY: 0 } }: Props) {
  const { startX, startY } = startOffset;
  const [movement, setMovement] = useState({
    startPageX: 0, // Page coord at drag start
    startPageY: 0, // Page coord at drag start
    endPageX: 0, // Page coord at drag end
    endPageY: 0, // Page coord at drag end
    dX: 0, // Distance dragged
    dY: 0, // Distance dragged
    startX, // Item offset coord
    startY, // Item offset coord
    isDragging: false,
    isTouch: false,
  });

  const onMouseDown = useCallback(
    (e) => {
      if (!isTouchEvent(e.type)) {
        e.preventDefault();
        e.persist();
      }
      e.stopPropagation();
      const pageX = isTouchEvent(e.type) ? e.changedTouches[0].pageX : e.pageX;
      const pageY = isTouchEvent(e.type) ? e.changedTouches[0].pageY : e.pageY;
      const newMovement = {
        ...movement,
        startPageX: pageX,
        startPageY: pageY,
        isDragging: true,
        isTouch: isTouchEvent(e.type),
      };
      setMovement(newMovement);
      if (mouseDownCb) {
        mouseDownCb(newMovement);
      }
    },
    [movement, setMovement],
  );

  const onMouseMove = useCallback(
    (e) => {
      if (!movement.isDragging) {
        return;
      }
      if (!isTouchEvent(e.type)) {
        e.preventDefault();
        e.persist();
      }
      e.stopPropagation();
      const pageX = isTouchEvent(e.type) ? e.changedTouches[0].pageX : e.pageX;
      const pageY = isTouchEvent(e.type) ? e.changedTouches[0].pageY : e.pageY;

      const dX = pageX - movement.startPageX;
      const dY = pageY - movement.startPageY;
      const newMovement = {
        ...movement,
        dX,
        dY,
        endPageX: pageX,
        endPageY: pageY,
        isTouch: isTouchEvent(e.type),
      };
      setMovement(newMovement);
      if (mouseMoveCb) {
        mouseMoveCb(newMovement);
      }
    },
    [movement, setMovement],
  );

  const onDragEnd = useCallback(
    (e) => {
      if (!movement.isDragging) {
        return;
      }
      if (!isTouchEvent(e.type)) {
        e.preventDefault();
        e.persist();
      }
      e.stopPropagation();
      const newMovement = {
        ...movement,
        isDragging: false,
        isTouch: isTouchEvent(e.type),
      };
      setMovement(newMovement);
      if (dragEndCb) {
        dragEndCb(newMovement);
      }
    },
    [movement, setMovement],
  );

  return { onMouseDown, onMouseMove, onDragEnd, movement, setMovement };
}
