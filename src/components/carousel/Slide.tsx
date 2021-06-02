import React, { memo, useRef, useState } from 'react';
import styled from 'styled-components';
import { SlideProps } from '~/components/carousel/slide.props';
import { useDrag } from '~/hooks/useDrag';

const Container = styled.div`
  display: flex;
  width: 60%;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border-color: grey;
  border-style: solid;
  border-width: 0 0.5px 0 0.5px;
`;
const DropZone = styled.div<{ isDragging?: boolean }>`
  flex: 0 0 auto;
  width: 100%;
  overflow: hidden;
  position: relative;
  background: cyan;
  cursor: ${(p) => (p.isDragging ? 'grabbing' : 'grab')};
`;
const DraggableItem = styled.div.attrs<{ offsetX?: number; offsetY?: number }>((p) => ({
  style: {
    left: `${p.offsetX}px` || 0,
    top: `${p.offsetY}px` || 0,
  },
}))<{ offsetX?: number; offsetY?: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const Slide = memo(({ moveable, children, ...rest }: SlideProps) => {
  const dragItemRef = useRef<HTMLDivElement>(null);
  const [itemOffset, setItemOffset] = useState({ offsetX: 0, offsetY: 0 });

  const { onMouseDown, onMouseMove, onDragEnd, movement, setMovement } = useDrag({
    mouseDownCb: () => {
      if (dragItemRef.current !== null) {
        setMovement((prev) => ({
          ...prev,
          startX: dragItemRef!.current!.offsetLeft,
          startY: dragItemRef!.current!.offsetTop,
        }));
      }
    },
    mouseMoveCb: ({ dX, dY, startX, startY }) => {
      setItemOffset((prev) => ({
        ...prev,
        offsetX: startX + dX,
        offsetY: startY + dY,
      }));
    },
  });

  if (!moveable) {
    return <Container {...rest}>{children}</Container>;
  }

  return (
    <DropZone
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      onTouchStart={onMouseDown}
      onTouchMove={onMouseMove}
      onTouchEnd={onDragEnd}
      isDragging={movement.isDragging}
      {...rest}
    >
      <DraggableItem
        ref={dragItemRef}
        offsetX={itemOffset.offsetX}
        offsetY={itemOffset.offsetY}
        onDragStart={() => false}
      >
        {children}
      </DraggableItem>
    </DropZone>
  );
});
