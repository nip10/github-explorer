import useDeleteBookmark from "@/lib/supabase/useDeleteBookmark";
import Carousel, { type SlideType } from "@/components/ui/Carousel";
import { EmptyState, Section } from "@/components/ui/Shared";
import { useBookmarksContext } from "@/context/BookmarksContext";

const MyBookmarks: React.FC = () => {
  const { bookmarks } = useBookmarksContext();
  const deleteBookmark = useDeleteBookmark();
  const carouselSlides: SlideType[] = bookmarks.map((bookmark) => ({
    img: bookmark.repo_image_url,
    alt: `Summary of ${bookmark.repo_owner}/${bookmark.repo_name} repository information`,
    metadata: {
      bookmarked: true,
    },
  }));

  const onSlideClick = (slide: SlideType, index: number) => {
    const repoUrl = bookmarks[index].repo_url;
    if (repoUrl) {
      window.open(repoUrl, "_blank", "noreferrer");
    }
  };

  const onBookmarkClick = async (slide: SlideType, index: number) => {
    const bookmarkId = bookmarks[index].bookmark_id;
    if (bookmarkId) {
      await deleteBookmark(bookmarkId);
    }
  };

  return (
    <Section>
      <h2>My Bookmarks</h2>
      {bookmarks.length > 0 ? (
        <Carousel
          slides={carouselSlides}
          options={{
            slidesToScroll: "auto",
            containScroll: "trimSnaps",
            draggable: false,
          }}
          onSlideClick={onSlideClick}
          onBookmarkClick={onBookmarkClick}
          withBookmarks
        />
      ) : (
        <EmptyState>
          <p>No bookmarks added.</p>
        </EmptyState>
      )}
    </Section>
  );
};

export default MyBookmarks;
