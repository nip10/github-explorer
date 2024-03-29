import styled from "styled-components";

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
  height: calc(100vh - var(--header_height));
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export default Container;
