import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  margin: 24px 0;
  width: 100%;
  height: 56px;
  border: 0;
  padding: 0 16px;

  background: #ff9000;
  color: #312e38;
  font-weight: 500;
  border-radius: 10px;
  transition: background-color 0.2s ease-in;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
