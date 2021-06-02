import React, { memo } from 'react';
import styled from 'styled-components';
import { ButtonProps } from '~/components/button/button.props';
import { color } from '~/theme';

const StyledButton = styled.button`
  background: ${color.palette.white};
  padding: 5px 5px;
  border-radius: 5px;
  margin: 5px 5px;
  background: cyan;
  @media only screen and (max-width: 768px) {
    width: 100%;
  } ;
`;

export const Button = memo(({ ...rest }: ButtonProps) => <StyledButton {...rest} />);
