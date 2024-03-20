import { ElementType, ReactElement, memo, useEffect, useMemo, useRef, useState } from "react";
import { useScrollAware } from "../lib/useScrollAware";
import css from "./VirtualizedBox.module.css";

type Props = {
  renderItem: (index: number, offset: number) => ReactElement;
  itemHeight: number;
  itemCount: number;
  viewportHeight: number;
  endOfListReached?: boolean;
  LoadingProgressElement?: ElementType;
  overScanCount?: number;
  initialScrollTop?: number;
  headerSlot?: ReactElement;
  footerSlot?: ReactElement;
  onUnmountHandler?: (scrollTopPos: number) => void;
  onScrolledToBottomHandler?: () => void;
};

export const VirtualizedBox = memo(
  ({
    renderItem,
    itemHeight,
    itemCount,
    endOfListReached,
    LoadingProgressElement,
    overScanCount = 4,
    initialScrollTop = 0,
    onUnmountHandler,
    onScrolledToBottomHandler,
    headerSlot,
    footerSlot,
    viewportHeight,
  }: Props) => {
    const { containerRef, viewportRef, totalHeight, scrollTop } = useScrollAware({
      itemCount,
      itemHeight,
      viewportHeight,
      initialScrollTop,
      onUnmountHandler,
      onScrolledToBottomHandler,
    });

    const [additionLoaderHeight, setAdditionLoaderHeight] = useState(0);
    const loadingProgressRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (!endOfListReached && LoadingProgressElement) {
        if (loadingProgressRef.current) {
          setAdditionLoaderHeight(loadingProgressRef.current.clientHeight + 10);
        }
      } else {
        setAdditionLoaderHeight(0);
      }
    }, [endOfListReached, LoadingProgressElement]);

    let startNode = Math.floor(scrollTop / itemHeight) - overScanCount;
    startNode = Math.max(0, startNode);

    let visibleNodeCount = Math.ceil(viewportHeight / itemHeight) + 2 * overScanCount;
    visibleNodeCount = Math.min(itemCount - startNode, visibleNodeCount);

    const offsetY = startNode * itemHeight;

    const visibleChildren = useMemo(
      () => new Array(visibleNodeCount).fill(null).map((_, index) => renderItem(index, startNode)),
      [startNode, visibleNodeCount, renderItem],
    );

    return (
      <div
        className={css.container}
        style={{
          height: viewportHeight,
          minHeight: viewportHeight,
        }}
        ref={containerRef}
      >
        {headerSlot}
        <div
          className={css.viewport}
          style={{
            height: totalHeight + 30 + additionLoaderHeight,
          }}
          ref={viewportRef}
        >
          <div
            className={css.visibleContainer}
            style={{
              transform: `translateY(${offsetY}px)`,
            }}
          >
            {visibleChildren}
            {!endOfListReached && LoadingProgressElement && (
              <LoadingProgressElement ref={loadingProgressRef} />
            )}
          </div>
        </div>

        {footerSlot}
      </div>
    );
  },
);
