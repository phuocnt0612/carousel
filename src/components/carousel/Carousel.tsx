import React, { memo } from 'react';
import styled from 'styled-components';
import { color } from '~/theme';
import { CarouselProps } from '~/components/carousel/carousel.props';

const Container = styled.div`
  background: ${color.palette.lightGrey};
  padding: 15px 15px;
`;

export const Carousel = memo(({ onChange, containerStyle, ...rest }: CarouselProps) => {
  return (
    <Container style={containerStyle}>
      <p>this is a carousel</p>
    </Container>
  );
});
