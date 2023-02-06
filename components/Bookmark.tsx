import { MouseEventHandler } from "react";
import styled from "styled-components";

const Container = styled.div.attrs({
  "data-testid": "bookmark",
})`
  display: none;
  background-color: ${({ theme }) => theme.colors.slate[300]};
  border-radius: 1rem;
  align-items: center;
  justify-content: center;
  padding: 0.375rem;
  position: absolute;
  top: 40px;
  right: 40px;
  transition: background-color 100ms ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.colors.slate[400]};
  }
  > svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

type BookmarkProps = {
  bookmarked: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

const Bookmark: React.FC<BookmarkProps> = ({ bookmarked, onClick }) => {
  return (
    <Container onClick={onClick}>
      {bookmarked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          id="star_filled"
          data-name="star filled"
        >
          <rect
            id="Rectangle_4"
            data-name="Rectangle 4"
            width="24"
            height="24"
            fill="none"
          />
          <path
            id="Star"
            d="M10,15,4.122,18.09l1.123-6.545L.489,6.91l6.572-.955L10,0l2.939,5.955,6.572.955-4.755,4.635,1.123,6.545Z"
            transform="translate(2 3)"
            stroke="#000000"
            strokeMiterlimit="10"
            strokeWidth="1.5"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          id="star_outlined"
          data-name="star outlined"
        >
          <rect
            id="Rectangle_4"
            data-name="Rectangle 4"
            width="24"
            height="24"
            fill="none"
          />
          <path
            id="Star"
            d="M10,15,4.122,18.09l1.123-6.545L.489,6.91l6.572-.955L10,0l2.939,5.955,6.572.955-4.755,4.635,1.123,6.545Z"
            transform="translate(2 3)"
            fill="none"
            stroke="#000000"
            strokeMiterlimit="10"
            strokeWidth="1.5"
          />
        </svg>
      )}
    </Container>
  );
};

export default Bookmark;
