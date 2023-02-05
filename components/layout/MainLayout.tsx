import Container from "./Container";
import Header from "./Header";

const MainLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
};

export default MainLayout;
