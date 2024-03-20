import { useEffect, useRef, useState } from "react";

type ScrollAware = {
  onUnmountHandler?: ((scrollTopPos: number) => void) | null;
  onScrolledToBottomHandler?: (() => void) | null;
  itemCount: number;
  itemHeight: number;
  viewportHeight: number;
  initialScrollTop: number;
};

export const useScrollAware = ({
  itemCount,
  itemHeight,
  viewportHeight,
  initialScrollTop,
  onUnmountHandler,
  onScrolledToBottomHandler,
}: ScrollAware) => {
  const [totalHeight, setTotalHeight] = useState(itemCount * itemHeight);
  const [scrollTop, setScrollTop] = useState(initialScrollTop);
  const scrollTopRef = useRef(scrollTop);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const onScroll = (ev: Event) => {
    const target = ev.currentTarget as HTMLDivElement;
    requestAnimationFrame(() => {
      setScrollTop(target.scrollTop);
      scrollTopRef.current = target.scrollTop;
    });

    let contentHeight = 0;
    if (containerRef.current) {
      for (const containerChild of containerRef.current.children) {
        contentHeight += containerChild.clientHeight;
        if (containerChild === viewportRef.current) {
          break;
        }
      }
    }

    if (
      contentHeight - target.scrollTop <= viewportHeight &&
      typeof onScrolledToBottomHandler === "function"
    ) {
      setTimeout(onScrolledToBottomHandler, 100);
    }
  };

  useEffect(() => {
    if (totalHeight < viewportHeight && typeof onScrolledToBottomHandler === "function") {
      onScrolledToBottomHandler();
    }
  }, [viewportHeight, totalHeight]);

  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (scrollContainer !== null) {
      scrollContainer.scrollTop = scrollTop;
      setTotalHeight(itemCount * itemHeight);

      scrollContainer.addEventListener("scroll", onScroll);

      return () => scrollContainer.removeEventListener("scroll", onScroll);
    }
  }, [itemCount, viewportHeight]);

  useEffect(() => {
    return () => {
      if (typeof onUnmountHandler === "function") {
        onUnmountHandler(scrollTopRef.current);
      }
    };
  }, [onUnmountHandler]);

  return { containerRef, viewportRef, totalHeight, scrollTop };
};
