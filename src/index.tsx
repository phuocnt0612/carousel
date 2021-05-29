import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Button } from '~/components';
import { Carousel } from '~/components/carousel/Carousel';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  background: cyan;
`;
const CarouselContainer = styled.div`
  width: 800px;
  height: 500px;
  margin-top: 30px;
  margin-bottom: 70px;

  background: #000;
`;

const App = () => {
  return (
    <Container>
      <CarouselContainer>
        <Carousel>
          <div>hello</div>
        </Carousel>
        /
      </CarouselContainer>
      <Button>Generate new set of images</Button>
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
