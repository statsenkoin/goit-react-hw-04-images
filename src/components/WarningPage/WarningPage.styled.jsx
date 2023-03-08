import styled from 'styled-components';

export const WarningPageStyled = styled.h2`
  margin: 0;
  font-size: 60px;
  text-align: center;
  color: tomato;
  width: 100vw;
  height: 100vh;
  padding-block: 200px;

  white-space: pre-wrap;

  animation-name: changeColor;
  animation-duration: 3000ms;
  animation-iteration-count: infinite;

  @keyframes changeColor {
    0% {
      color: red;
    }
    50% {
      color: orange;
    }
    100% {
      color: red;
    }
  }
`;
