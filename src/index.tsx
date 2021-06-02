import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Button, Carousel } from '~/components';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100vh;
  align-items: center;
`;
const CarouselContainer = styled.div`
  display: flex;
  width: 50%;
  height: 50vh;
  margin-top: 30px;
  margin-bottom: 10px;
  border: 1px solid gray;
  @media only screen and (max-width: 768px) {
    width: 95%;
    height: 50%;
  } ;
`;

const ControlGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  width: 80%;
`;
const ItemWrapper = styled.div`
  padding: 5px 5px;
  height: 90%;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const HTMLItem = styled.div`
  background: darkgrey;
  margin: 10px;
  padding: 100px 20px;
  text-align: center;
`;
const StyledImg = styled.img`
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
`;
const dummyArray = Array.from(Array(10).keys());

const App = () => {
  const [control, setControl] = useState({ moveable: false });
  const [activeIndex, setActiveIndex] = useState(0);
  const [jumpTo, setJumpTo] = useState<number | undefined>(undefined);
  const [slideData, setSlideData] = useState<ReactNode[]>([]);

  useEffect(() => {
    generateDataSet('image');
  }, []);

  const onSlideChange = (newActiveIndex) => {
    setActiveIndex(newActiveIndex);
  };

  const generateDataSet = useCallback((type: 'image' | 'html' = 'image') => {
    const res = dummyArray.map((i) => (
      <ItemWrapper key={i}>
        {type === 'image' && (
          <StyledImg src={`https://picsum.photos/210/280?random=${Math.random()}`} alt="" onDragStart={() => false} />
        )}
        {type === 'html' && <HTMLItem>This is the {i + 1}-nth div</HTMLItem>}
      </ItemWrapper>
    ));
    setSlideData(res);
  }, []);

  const handleJumpTo = ({ target }) => {
    setActiveIndex(Number(target.value));
    setJumpTo(Number(target.value));
  };

  return (
    <Container>
      <CarouselContainer>
        <Carousel
          moveable={control.moveable}
          onSlideChange={onSlideChange}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          threshold={80}
          jumpTo={jumpTo}
        >
          {slideData}
        </Carousel>
      </CarouselContainer>
      <div>Current mode: {control.moveable ? 'Slide Animate' : 'Swipe'}</div>
      <ControlGroup>
        <Button onClick={() => generateDataSet('image')}>Generate new set of 10 images</Button>
        <Button onClick={() => generateDataSet('html')}>Generate new set of 10 div tag</Button>
        <div style={{ marginLeft: 10 }}>
          <label style={{ marginRight: 10 }}>Jump to slide:</label>
          <select name="slide-idx" defaultValue={0} onChange={handleJumpTo}>
            {dummyArray.map((i) => (
              <option value={i} key={i}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      </ControlGroup>
      <ControlGroup>
        <Button disabled={!control.moveable} onClick={() => setControl((prev) => ({ ...prev, moveable: false }))}>
          Enable Swipe
        </Button>
        <Button disabled={control.moveable} onClick={() => setControl((prev) => ({ ...prev, moveable: true }))}>
          Enable Animate
        </Button>
      </ControlGroup>
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
