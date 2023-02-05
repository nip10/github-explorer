import styled from "styled-components";
import { VStack } from "./Shared";

const Input = styled.input`
  width: 100%;
  min-width: 0px;
  outline: transparent solid 2px;
  outline-offset: 2px;
  position: relative;
  appearance: none;
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
  transition-duration: 200ms;
  font-size: 1rem;
  padding-inline-start: 1rem;
  padding-inline-end: 1rem;
  height: 2.5rem;
  border-radius: 0.375rem;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  border-color: ${({ theme }) => theme.colors.slate[600]};
  background: inherit;
`;

const InputGroup = styled(VStack)``;

export { InputGroup };
export default Input;
