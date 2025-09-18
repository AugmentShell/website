"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";

type CarouselProps = {
  children: React.ReactNode;
  className?: string;
  showDots?: boolean;
  options?: EmblaOptionsType;
  /** Set all slides to the tallest slide's height */
  matchTallest?: boolean;
};

export default function Carousel({
  children,
  className = "",
  showDots = true,
  options,
  matchTallest = true, // turn on by default for your case
}: CarouselProps) {
  const slides = React.Children.toArray(children);
  const defaultOptions: EmblaOptionsType = { loop: true, align: "start" };
  const [emblaRef, emblaApi] = useEmblaCarousel({ ...defaultOptions, ...options });

  // Keep a handle to the viewport and to each slide element
  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const slideRefs = React.useRef<HTMLDivElement[]>([]);
  slideRefs.current = [];

  const setViewportRef = (el: HTMLDivElement | null) => {
    viewportRef.current = el;
    // pass same element into Embla's ref
    (emblaRef as (el: HTMLDivElement | null) => void)(el);
  };

  const registerSlide = (el: HTMLDivElement | null) => {
    if (el) slideRefs.current.push(el);
  };

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  // Equalize heights by measuring tallest child content
  const equalizeHeights = React.useCallback(() => {
    if (!matchTallest) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    const nodes = slideRefs.current;
    if (!nodes.length) return;

    // Clear any previous forced height first to get accurate measurements
    viewport.style.height = "";
    nodes.forEach((n) => {
      n.style.height = ""; // clear old
    });

    // Measure each slide's natural content height
    let max = 0;
    for (const n of nodes) {
      // the slide div contains whatever you render; measure its scrollHeight
      const h = n.scrollHeight;
      if (h > max) max = h;
    }
    if (max <= 0) return;

    // Hard-set viewport height and slide heights
    viewport.style.height = `${max}px`;
    nodes.forEach((n) => {
      n.style.height = `${max}px`;
    });
  }, [matchTallest]);

  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const onReInit = () => {
      // wait a frame so Embla finishes layout, then measure
      requestAnimationFrame(equalizeHeights);
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onReInit);

    // Initial measure once Embla is ready
    requestAnimationFrame(equalizeHeights);

    // Re-measure on window resize
    const onResize = () => requestAnimationFrame(equalizeHeights);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onReInit);
    };
  }, [emblaApi, equalizeHeights]);

  const scrollTo = (i: number) => emblaApi?.scrollTo(i);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Viewport gets a fixed inline height equal to tallest slide */}
      <div ref={setViewportRef} className="overflow-hidden w-full">
        <div className="flex touch-pan-y touch-pinch-zoom">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="min-w-0 shrink-0 grow-0 basis-full"
            >
              {/* This wrapper is what we measure and force-height */}
              <div ref={registerSlide} className="w-full h-full">
                {slide}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showDots && slides.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={[
                "h-3 w-3 rounded-full border border-black/30 transition-transform",
                i === selectedIndex ? "scale-110 bg-black" : "opacity-60 bg-gray-400",
              ].join(" ")}
            />
          ))}
        </div>
      )}
    </div>
  );
}
