import { cleanup, render, screen } from "@testing-library/react";
import { myTheme } from "@/styles/theme";
import { ThemeProvider } from "styled-components";
import Carousel from "./Carousel";

afterEach(cleanup);

const slides = [
  {
    img: "/placeholder.png",
    alt: "Summary of PanJiaChen/vue-element-admin repository information",
    metadata: {
      bookmarked: false,
    },
  },
  {
    img: "/placeholder.png",
    alt: "Summary of ElemeFE/element repository information",
    metadata: {
      bookmarked: true,
    },
  },
  {
    img: "/placeholder.png",
    alt: "Summary of element-plus/element-plus repository information",
    metadata: {
      bookmarked: false,
    },
  },
  {
    img: "/placeholder.png",
    alt: "Summary of lin-xin/vue-manage-system repository information",
    metadata: {
      bookmarked: false,
    },
  },
];

describe("Carousel", () => {
  it("should render slides", () => {
    render(
      <ThemeProvider theme={myTheme}>
        <Carousel slides={slides} />
      </ThemeProvider>
    );

    const carouselSlideImages = screen.getAllByRole("img");
    expect(carouselSlideImages.length).toBe(slides.length);
  });
});
