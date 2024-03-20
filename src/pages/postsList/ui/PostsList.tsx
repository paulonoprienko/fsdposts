import { useOutletContext } from "react-router";
import { LayoutFooter } from "@/widgets/LayoutFooter";
import { LayoutHeader } from "@/widgets/LayoutHeader";
import { VirtualizedBox } from "@/widgets/VirtualizedBox";
import { LinkButtonToPost } from "@/features/posts";
import { Post, PostListItem } from "@/entities/post";
import { useWindowResize } from "@/shared/lib/useWindowResize";
import { useAppSelector, useAppDispatch } from "@/shared/model/hooks";
import { LoadingProgress } from "@/shared/ui/LoadingProgress/LoadingProgress";
import { setParams, setScrollTop } from "..";
import { selectScrollTop } from "../model/slice";

export const PostsList = () => {
  const { postsData, isError } = useOutletContext<{ postsData: Post[]; isError: boolean }>();

  const scrollTop = useAppSelector(selectScrollTop);
  const dispatch = useAppDispatch();
  const { height } = useWindowResize();

  return (
    <VirtualizedBox
      renderItem={(index, offset) => (
        <PostListItem
          key={index + offset}
          linkSlot={<LinkButtonToPost to={`/post/${postsData[index + offset].id}`} />}
          {...postsData[index + offset]}
        />
      )}
      itemHeight={50} //здесь необходимо точно знать какую высоту px мы закладываем под ListItem
      itemCount={postsData.length}
      endOfListReached={postsData[postsData.length - 1]?.eol}
      LoadingProgressElement={LoadingProgress}
      overScanCount={4}
      initialScrollTop={scrollTop}
      headerSlot={
        <>
          <LayoutHeader />
          {isError && <div>Error</div>}
        </>
      }
      footerSlot={<LayoutFooter />}
      onUnmountHandler={(scrollTopPos) => dispatch(setScrollTop(scrollTopPos))}
      onScrolledToBottomHandler={() => dispatch(setParams({ limit: 10, start: postsData.length }))}
      viewportHeight={height}
    />
  );
};
