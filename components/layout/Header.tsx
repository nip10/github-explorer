import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import type { Database } from "@/db/types";
import { UnstlyedList } from "../ui/List";
import { HStack } from "../ui/Shared";
import Button from "../ui/Button";
import { NavItem } from "../ui/Nav";
import { useUserProfileContext } from "@/context/UserContext";

export const HEADER_HEIGH_PX = "70px";

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.slate[300]};
  color: ${({ theme }) => theme.colors.slate[800]};
  height: ${HEADER_HEIGH_PX};
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
`;

const Logo = styled(Link)`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[800]};
  text-decoration: none;
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
  const supabaseClient = useSupabaseClient<Database>();
  const router = useRouter();
  const user = useUser();
  const { profile, clearProfile } = useUserProfileContext();

  const onLogoutButtonClick = async () => {
    await supabaseClient.auth.signOut();
    clearProfile();
    router.push("/");
  };

  return (
    <StyledHeader>
      <Container>
        <HStack gap="2rem">
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
        </HStack>
        <HStack gap="1rem">
          {user ? (
            <LoggedInContent
              username={profile?.username}
              onLogoutButtonClick={onLogoutButtonClick}
            />
          ) : (
            <LoggedOutContent />
          )}
        </HStack>
      </Container>
    </StyledHeader>
  );
};

export default Header;
