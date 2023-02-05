import styled from "styled-components";
import Spinner from "./Spinner";

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

type HStackProps = {
  gap?: string;
};

const HStack = styled.div<HStackProps>`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: ${({ gap }) => gap ?? "0.5rem"};
`;

type VStackProps = {
  gap?: string;
};

const VStack = styled.div<VStackProps>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: ${({ gap }) => gap ?? "0.5rem"};
`;

const Section = styled(VStack).attrs({ as: "section" })`
  margin-bottom: 1rem;
`;

const EmptyState = styled(Center)`
  background-color: ${({ theme }) => theme.colors.slate[100]};
  color: ${({ theme }) => theme.colors.slate[800]};
  min-height: 100px;
  border-radius: 1rem;
`;

const LoadingState = ({ children }: React.PropsWithChildren) => {
  return (
    <EmptyState>
      <Spinner />
      {children}
    </EmptyState>
  );
};

export { Center, HStack, VStack, Section, EmptyState, LoadingState };
