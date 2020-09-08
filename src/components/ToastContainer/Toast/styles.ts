import styled, { css, keyframes } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  type: 'info' | 'success' | 'warning' | 'error';
  description?: string;
  timer: number;
}

const toastTypesVariations = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,
  warning: css`
    background: #ffecb5;
    color: #ff9000;
  `,
};

const barTypesVariations = {
  info: css`
    background: #3172b7;
  `,
  error: css`
    background: #c53030;
  `,
  success: css`
    background: #2e656a;
  `,
  warning: css`
    background: #ff9000;
  `,
};

const barProgressFromRight = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
`;

export const Container = styled(animated.div)<ContainerProps>`
  width: 340px;

  display: flex;
  position: relative;

  padding: 16px 30px 16px 16px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  & + div {
    margin-top: 8px;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0px;
    height: 5px;

    ${({ type }) => barTypesVariations[type]};
    animation: ${barProgressFromRight};

    ${({ timer }) => {
      const duration = `${(timer + 50) / 1000}s`;
      return css`
        animation-duration: ${duration};
      `;
    }};
  }

  ${({ type }) => toastTypesVariations[type]}

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      opacity: 0.8;
      margin-top: 4px;
      font-size: 14px;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 18px;
    opacity: 0.6;
    border: 0;
    background: transparent;

    color: inherit;
  }

  ${({ description }) =>
    !description &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`;
