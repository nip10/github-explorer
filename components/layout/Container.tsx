import styled from "styled-components";
import { HEADER_HEIGH_PX } from "./Header";

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
  height: calc(100vh - ${HEADER_HEIGH_PX});
`;

export default Container;
