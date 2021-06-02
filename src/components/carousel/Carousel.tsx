import React, { Children, memo, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { CarouselProps } from '~/components/carousel/carousel.props';
import { Slide } from '~/components/carousel/Slide';
import { ArrowButton } from '~/components/button/ArrowButton';
import { useDrag } from '~/hooks';

const Container = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;
const SliderContainer = styled.div<{ isDragging?: boolean }>`
  display: flex;
  flex: 1;
  overflow-x: hidden;
  cursor: ${(p) => (p.isDragging ? 'grabbing' : 'grab')};
`;

const scrollToSlide = (idx: number, options = {}) => {
  const el = document.getElementById(`${PREFIX}${idx}`);
  if (el) {
    el.scrollIntoView({
      block: 'center',
      inline: 'center',
      behavior: 'smooth',
      ...options,
    });
  }
};

const PREFIX = 'CAROUSEL_';
const onDragStart = () => false;
let scrollTimeout;

export const Carousel = memo(
  ({
    onSlideChange,
    containerStyle,
    activeIndex,
    setActiveIndex,
    jumpTo,
    moveable = false,
    threshold = 50,
    children,
    ...rest
  }: CarouselProps) => {
    const sliderRef = useRef<HTMLDivElement>(null);

    const { onMouseDown, onMouseMove, onDragEnd, movement, setMovement } = useDrag({
      mouseDownCb: () => {
        if (sliderRef.current !== null) {
          setMovement((prev) => ({
            ...prev,
            startX: sliderRef!.current!.offsetLeft,
            startScrollX: sliderRef!.current!.scrollLeft,
          }));
        }
      },
      mouseMoveCb: ({ startScrollX, startX, endPageX, startPageX, ...resta }) => {
        if (sliderRef.current !== null) {
          const startPos = startPageX - startX;
          const endPos = endPageX - sliderRef.current.offsetLeft;
          sliderRef.current.scrollTo({
            left: startScrollX - (endPos - startPos),
          });
        }
      },
      dragEndCb: ({ dX, isTouch }) => {
        const scrollOption = { behavior: isTouch ? 'auto' : 'smooth' };
        const distance = -dX; // Because swipe is in revert direction
        if (distance > threshold) {
          displayNextSlide(scrollOption);
        } else if (distance < -threshold) {
          displayPrevSlide(scrollOption);
        } else {
          scrollToSlide(activeIndex, scrollOption);
        }
      },
    });

    useEffect(() => {
      if (jumpTo !== undefined) {
        scrollToSlide(jumpTo);
      }
    }, [jumpTo]);

    useEffect(() => {
      scrollToSlide(activeIndex, { behavior: 'auto' });
    }, [moveable, children]);

    useEffect(() => {
      const lastIndex = Children.count(children) - 1;
      if (sliderRef?.current !== null && lastIndex > 0) {
        sliderRef.current.addEventListener('scroll', () => {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            if (activeIndex > lastIndex) {
              scrollToSlide(0, { behavior: 'auto' });
              setActiveIndex(0);
            }
            if (activeIndex < 0) {
              scrollToSlide(lastIndex, { behavior: 'auto' });
              setActiveIndex(lastIndex);
            }
          }, 50);
        });
      }
      return () => clearTimeout(scrollTimeout);
    }, [activeIndex, children]);

    const renderSlides = useCallback(
      (position: 'before' | 'after' | undefined = undefined) => {
        const length = Children.count(children);
        return Children.map(children, (item, idx) => {
          let slideIdx = idx;
          if (position === 'after') {
            slideIdx = length + idx;
          }
          if (position === 'before') {
            slideIdx = idx - length;
          }
          const id = `${PREFIX}${slideIdx}`;
          return (
            <Slide key={id} id={id} moveable={moveable} onDragStart={onDragStart}>
              {item}
            </Slide>
          );
        });
      },
      [children, moveable],
    );
    const displayNextSlide = (options = {}) => {
      scrollToSlide(activeIndex + 1, options);
      onSlideChange(activeIndex + 1);
    };
    const displayPrevSlide = (options = {}) => {
      scrollToSlide(activeIndex - 1, options);
      onSlideChange(activeIndex - 1);
    };

    return (
      <Container style={containerStyle} {...rest}>
        <ArrowButton onClick={displayPrevSlide}>&#8249;</ArrowButton>
        <SliderContainer
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseLeave={onDragEnd}
          onMouseUp={onDragEnd}
          onTouchStart={onMouseDown}
          onTouchMove={onMouseMove}
          onTouchEnd={onDragEnd}
          ref={sliderRef}
          isDragging={movement.isDragging}
        >
          {renderSlides('before')}
          {renderSlides()}
          {renderSlides('after')}
        </SliderContainer>
        <ArrowButton position="right" onClick={displayNextSlide}>
          &#8250;
        </ArrowButton>
      </Container>
    );
  },
);
