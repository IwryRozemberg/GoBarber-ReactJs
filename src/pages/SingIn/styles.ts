import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import singInBackGround from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 700px;

  display: flex;
  place-content: center;
  place-items: center;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;

  animation: ${appearFromLeft} 1s;

  form {
    width: 340px;
    margin: 80px 0;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      transition: color 0.2s ease-in;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  button.disable {
    cursor: none;
    pointer-events: none;
    opacity: 0.5;
  }

  > a {
    display: flex;
    align-items: center;
    color: #ff9000;
    transition: color 0.2s ease-in;

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }

    svg {
      margin-right: 18px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${singInBackGround}) no-repeat center;
  background-size: cover;
`;
