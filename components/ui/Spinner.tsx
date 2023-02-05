import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  display: inline-block;
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 1.75rem;
    height: 1.75rem;
    margin: 8px;
    border: 2px solid ${({ theme }) => theme.colors.slate[400]};
    border-radius: 50%;
    animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${({ theme }) => theme.colors.slate[400]} transparent
      transparent transparent;
    :nth-child(1) {
      animation-delay: -0.45s;
    }
    :nth-child(2) {
      animation-delay: -0.3s;
    }
    :nth-child(3) {
      animation-delay: -0.15s;
    }
  }
`;

const Spinner: React.FC = () => {
  return (
    <Container>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Container>
  );
};

export default Spinner;
