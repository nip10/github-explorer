import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import { UnstlyedList } from "../ui/List";
import { HStack } from "../ui/Shared";
import Button from "../ui/Button";
import { NavItem } from "../ui/Nav";
import { useUserProfileContext } from "@/context/UserContext";
import useLogout from "@/lib/supabase/useLogout";

export const HEADER_HEIGHT_PX = "70px";

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.slate[300]};
  color: ${({ theme }) => theme.colors.slate[800]};
  height: ${HEADER_HEIGHT_PX};
  display: flex;
  align-items: center;
  box-shadow: 0px 8px 20px rgb(0 0 0 / 5%);
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Logo = styled(Link)`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[800]};
  text-decoration: none;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const InnerContainer = styled(HStack)`
  @media (max-width: 768px) {
    gap: 0;
  }
`;

type LoggedInContentProps = {
  username?: string;
  onLogoutButtonClick: () => void;
};

const LoggedInContent: React.FC<LoggedInContentProps> = ({
  username,
  onLogoutButtonClick,
}) => {
  const router = useRouter();
  return (
    <>
      <Link href="/myaccount" passHref legacyBehavior>
        <Button variant="link" as="a" active={router.pathname === "/myaccount"}>
          {username}
        </Button>
      </Link>
      <Button variant="link" onClick={onLogoutButtonClick}>
        Logout
      </Button>
    </>
  );
};

const LoggedOutContent: React.FC = () => {
  return (
    <>
      <Link href="/auth/login" passHref legacyBehavior>
        <Button variant="link" as="a">
          Login
        </Button>
      </Link>
      <Link href="/auth/signup" passHref legacyBehavior>
        <Button variant="primary" as="a">
          Sign up
        </Button>
      </Link>
    </>
  );
};

const Header: React.FC = () => {
  const logout = useLogout();
  const router = useRouter();
  const user = useUser();
  const { profile, clearProfile } = useUserProfileContext();

  const onLogoutButtonClick = async () => {
    await logout();
    clearProfile();
    router.push("/");
  };

  return (
    <StyledHeader>
      <Container>
        <InnerContainer gap="2rem">
          <Logo href="/">GitHub Explorer</Logo>
          <nav>
            <UnstlyedList>
              <NavItem active={router.pathname === "/"}>
                <Link href="/" passHref legacyBehavior>
                  <Button variant="link" as="a">
                    Discovery
                  </Button>
                </Link>
              </NavItem>
            </UnstlyedList>
          </nav>
        </InnerContainer>
        <InnerContainer gap="1rem">
          {user ? (
            <LoggedInContent
              username={profile?.username}
              onLogoutButtonClick={onLogoutButtonClick}
            />
          ) : (
            <LoggedOutContent />
          )}
        </InnerContainer>
      </Container>
    </StyledHeader>
  );
};

export default Header;
