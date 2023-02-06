import React, { useState, useEffect, useCallback, useMemo } from "react";
import useEmblaCarousel, { type EmblaOptionsType } from "embla-carousel-react";
import styled from "styled-components";
import Image from "next/image";
import Bookmark from "../Bookmark";

type PrevNextButtonPropType = {
  enabled: boolean;
  onClick: () => void;
};

const PrevButton: React.FC<PrevNextButtonPropType> = ({ enabled, onClick }) => {
  return (
    <ButtonPrev onClick={onClick} disabled={!enabled}>
      <svg viewBox="137.718 -1.001 366.563 644">
        <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
      </svg>
    </ButtonPrev>
  );
};

const NextButton: React.FC<PrevNextButtonPropType> = ({ enabled, onClick }) => {
  return (
    <ButtonNext onClick={onClick} disabled={!enabled}>
      <svg viewBox="0 0 238.003 238.003">
        <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
      </svg>
    </ButtonNext>
  );
};

const SLIDE_SPACING_REM = "1rem";

const Embla = styled.div`
  position: relative;
`;

const Viewport = styled.div`
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
  min-height: 200px;
  margin-left: calc(${SLIDE_SPACING_REM} * -1);
`;

const Slide = styled.div`
  flex: 0 0 33.3333%; // 3 slides
  min-width: 0;
  padding-left: ${SLIDE_SPACING_REM};
  position: relative;
  transition: transform 0.1s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.15);
    z-index: 2;
    > div {
      display: flex;
    }
  }
  @media (max-width: 1024px) {
    flex: 0 0 50%; // 2 slides
    > div {
      display: flex;
    }
  }
  @media (max-width: 768px) {
    flex: 0 0 100%; // 1 slide
    > div {
      display: flex;
    }
  }
`;

const Button = styled.button`
  appearance: none;
  background-color: transparent;
  touch-action: manipulation;
  cursor: pointer;
  border: 0;
  padding: 0;
  margin: 0;
  z-index: 1;
  color: ${({ theme }) => theme.colors.slate[500]};
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  transform: translateY(-50%);
  width: 2rem;
  height: 2rem;
  &:disabled {
    opacity: 0.3;
  }
  > svg {
    width: 100%;
    height: 100%;
  }
`;

const ButtonPrev = styled(Button)`
  left: 0;
`;

const ButtonNext = styled(Button)`
  right: 0;
`;

export type SlideType = {
  img: string;
  alt: string;
  metadata?: Record<string, any>;
};

type CarouselProps = {
  slides: SlideType[];
  options?: EmblaOptionsType;
  onSlideClick?: (slide: SlideType, index: number) => void;
  withBookmarks?: boolean;
  onBookmarkClick?: (slide: SlideType, index: number) => void;
};

const Carousel: React.FC<CarouselProps> = ({
  slides,
  options,
  onSlideClick,
  withBookmarks = false,
  onBookmarkClick,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [emblaApi, slides]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onEmblaSlideClick = useCallback(
    (slide: SlideType, index: number) => {
      if (emblaApi && emblaApi.clickAllowed()) {
        onSlideClick?.(slide, index);
      }
    },
    [emblaApi, onSlideClick]
  );

  const numSlidesInView = useMemo(() => {
    if (!emblaApi) return [];
    const indexes = emblaApi.slidesInView();
    return indexes.length;
  }, [emblaApi]);

  return (
    <>
      <Embla>
        <Viewport ref={emblaRef}>
          <Container>
            {slides.map((slide, index) => (
              <Slide
                key={`${slide.img}-${index}`}
                onClick={() => onEmblaSlideClick(slide, index)}
              >
                <Image
                  src={slide.img}
                  alt={slide.alt}
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                  priority={index < numSlidesInView}
                  sizes="100vw"
                />
                {withBookmarks && (
                  <Bookmark
                    bookmarked={slide.metadata?.bookmarked}
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookmarkClick?.(slide, index);
                    }}
                  />
                )}
              </Slide>
            ))}
          </Container>
        </Viewport>
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      </Embla>
    </>
  );
};

export default Carousel;
