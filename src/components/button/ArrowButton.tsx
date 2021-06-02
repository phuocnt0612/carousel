import React from 'react';
import styled from 'styled-components';

export const ArrowButton = styled.button.attrs<{ position?: 'left' | 'right' }>((p) => ({
  type: 'button',
  position: p.position || 'left',
}))<{ position?: 'left' | 'right' }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(p) => (p.position === 'left' ? 0 : undefined)};
  right: ${(p) => (p.position === 'right' ? 0 : undefined)};
  background-color: transparent;
  padding: 0 15px;
  font-size: 30px;
  border: none;
  z-index: 999;

  :hover & {
    cursor: pointer;
    background-color: rgb(0, 0, 0, 0.2);
  }
`;
