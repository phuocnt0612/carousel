import React, { memo } from 'react';
import styled from 'styled-components';
import { ButtonProps } from '~/components/button/button.props';
import { color } from '~/theme';

const StyledButton = styled.button`
  background: ${color.palette.white};
  padding: 5px 5px;
  border-radius: 5px;
`;

export const Button = memo(({ ...rest }: ButtonProps) => <StyledButton {...rest} />);
