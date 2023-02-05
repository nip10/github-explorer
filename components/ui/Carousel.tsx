import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel, { type EmblaOptionsType } from "embla-carousel-react";
import styled from "styled-components";

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
const SLIDE_SIZE_PERCENT = "33.3333%";
const SLIDE_HEIGHT_REM = "14rem";

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
  margin-left: calc(SLIDE_SPACING_REM * -1);
`;

const Bookmark = styled.div`
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

const Slide = styled.div`
  flex: 0 0 ${SLIDE_SIZE_PERCENT};
  min-width: 0;
  padding-left: ${SLIDE_SPACING_REM};
  position: relative;
  transition: transform 0.1s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.15);
    z-index: 2;
    > ${Bookmark} {
      display: flex;
    }
  }
`;

const SlideImg = styled.img`
  display: block;
  height: ${SLIDE_HEIGHT_REM};
  width: 100%;
  object-fit: contain;
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

  return (
    <>
      <Embla>
        <Viewport ref={emblaRef}>
          <Container>
            {slides.map((slide, index) => (
              <Slide
                key={slide.img}
                onClick={() => onEmblaSlideClick(slide, index)}
              >
                <SlideImg src={slide.img} alt={slide.alt} />
                {withBookmarks && (
                  <Bookmark
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookmarkClick?.(slide, index);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      fill="#000000"
                      version="1.1"
                      id="star"
                      width="800px"
                      height="800px"
                      viewBox="0 0 36.09 36.09"
                      xmlSpace="preserve"
                    >
                      <g>
                        <path d="M36.042,13.909c-0.123-0.377-0.456-0.646-0.85-0.688l-11.549-1.172L18.96,1.43c-0.16-0.36-0.519-0.596-0.915-0.596   s-0.755,0.234-0.915,0.598L12.446,12.05L0.899,13.221c-0.394,0.04-0.728,0.312-0.85,0.688c-0.123,0.377-0.011,0.791,0.285,1.055   l8.652,7.738L6.533,34.045c-0.083,0.387,0.069,0.787,0.39,1.02c0.175,0.127,0.381,0.191,0.588,0.191   c0.173,0,0.347-0.045,0.503-0.137l10.032-5.84l10.03,5.84c0.342,0.197,0.77,0.178,1.091-0.059c0.32-0.229,0.474-0.633,0.391-1.02   l-2.453-11.344l8.653-7.737C36.052,14.699,36.165,14.285,36.042,13.909z M25.336,21.598c-0.268,0.24-0.387,0.605-0.311,0.957   l2.097,9.695l-8.574-4.99c-0.311-0.182-0.695-0.182-1.006,0l-8.576,4.99l2.097-9.695c0.076-0.352-0.043-0.717-0.311-0.957   l-7.396-6.613l9.87-1.002c0.358-0.035,0.668-0.264,0.814-0.592l4.004-9.077l4.003,9.077c0.146,0.328,0.456,0.557,0.814,0.592   l9.87,1.002L25.336,21.598z" />
                      </g>
                    </svg>
                  </Bookmark>
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
