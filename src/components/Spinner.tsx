import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { Color } from 'styles/styled';

type SpinnerProps = {
  variant?: string
  color?: Color
}

const Spinner: FC<SpinnerProps> = ({ variant, color }) => {
  return (
    <Container variant={variant} color={color}>
      <div className="lds-dual-ring" />
    </Container>
  );
}

export default Spinner;

const Container = styled.div<{ variant?: string, color?: Color }>`
  .lds-dual-ring {
    display: inline-block;
    width: 50px;
    height: 50px;
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 35px;
    height: 35px;
    margin: 8px;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.accent};
    border-color: ${({ theme }) => theme.accent} transparent ${({ theme }) => theme.accent} transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  ${(props) =>
    props.variant == 'button' &&
    css`
      .lds-dual-ring {
        width: 12px;
        height: 12px;
      }
      .lds-dual-ring:after {
        width: 12px;
        height: 12px;
        margin: 0px;
        border: 2px solid ${({ theme }) => theme.accent};
        border-color: white transparent white transparent;
      }
	`}
  ${(props) =>
    props.variant == 'textinput' &&
    css`
      .lds-dual-ring {
        width: 15px;
        height: 15px;
      }
      .lds-dual-ring:after {
        width: 12px;
        height: 12px;
        margin: 0px;
        border: 2px solid ${({ theme }) => theme.accent};
        border-color: ${({ theme }) => theme.accent} transparent ${({ theme }) => theme.accent} transparent;
      }
	`}
`;