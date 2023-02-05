import styled from "styled-components";
import { VStack } from "./Shared";

const Form = styled(VStack).attrs({ as: "form" })``;

const FormLabel = styled.label`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.slate[600]};
`;

const ErrorMessage = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.red[600]};
`;

export { FormLabel, ErrorMessage };
export default Form;
