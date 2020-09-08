import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import singUpBackground from '../../assets/sing-up-background.png';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: stretch;
`;

export const Background = styled.div`
  flex: 1;
  background: url(${singUpBackground}) no-repeat center;
  background-size: cover;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 660px;
`;

const appearFromRight = keyframes`
  from {
    opacity: 1;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  animation: ${appearFromRight} 1s;

  form {
    width: 340px;
    margin: 80px 0;
    text-align: center;

    h1 {
      margin-bottom: 50px;
    }
  }

  a {
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in;

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }

    svg {
      margin-right: 20px;
    }
  }
`;
