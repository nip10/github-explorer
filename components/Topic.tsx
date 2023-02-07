import { useMemo } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import useRepositories, {
  type RepositorySortBy,
} from "@/lib/api/useRepositories";
import useCreateBookmark from "@/lib/supabase/useCreateBookmark";
import useDeleteBookmark from "@/lib/supabase/useDeleteBookmark";
import Carousel, { type SlideType } from "@/components/ui/Carousel";
import Dropdown, { type DropdownOption } from "@/components/ui/Dropdown";
import { HStack, LoadingState, VStack } from "@/components/ui/Shared";
import { useBookmarksContext } from "@/context/BookmarksContext";
import useLocalStorage from "@/hooks/useLocalStorage";

type TopicProps = {
  topic: string;
};

const repositorySortByOptions: DropdownOption<RepositorySortBy>[] = [
  { label: "Stars", value: "stars" },
  { label: "Forks", value: "forks" },
  { label: "Updated", value: "updated" },
  { label: "Help Wanted Issues", value: "help-wanted-issues" },
];

const Topic: React.FC<TopicProps> = ({ topic }) => {
  const user = useUser();
  const [sortBy, setSortBy] = useLocalStorage<RepositorySortBy>(
    `topicSortBy-${topic}`,
    "stars"
  );
  const { bookmarks } = useBookmarksContext();

  const { data: repositoriesData, isLoading } = useRepositories({
    language: topic.toLowerCase(),
    sortBy,
  });

  // We get the repos data from the API, but we need to update the bookmarked status when the user
  // bookmarks a repo
  const repositories = useMemo(() => {
    return repositoriesData
      ? repositoriesData?.repositories.items.map((item) => ({
          ...item,
          bookmarkId:
            bookmarks.find(
              (bookmark) =>
                `${bookmark.repo_owner}/${bookmark.repo_name}` === item.fullName
            )?.bookmark_id ?? item.bookmarkId,
        }))
      : [];
  }, [bookmarks, repositoriesData]);

  const carouselSlides: SlideType[] = repositories.map((item) => ({
    img: item.image,
    alt: `Summary of ${item.fullName} repository information`,
    metadata: {
      bookmarked: !!item.bookmarkId,
    },
  }));

  const onSlideClick = (slide: SlideType, index: number) => {
    const repoUrl = repositories[index].url;
    if (repoUrl) {
      window.open(repoUrl, "_blank", "noreferrer");
    }
  };

  const createBookmark = useCreateBookmark();
  const deleteBookmark = useDeleteBookmark();

  const onBookmarkClick = async (slide: SlideType, index: number) => {
    const repo = repositories[index];
    if (repo) {
      const { repoOwner, repoName, url, image, bookmarkId } = repo;
      if (bookmarkId) {
        await deleteBookmark(bookmarkId);
      } else {
        await createBookmark(repoOwner, repoName, url, image);
      }
    }
  };

  return (
    <VStack id={`topic-${topic.toLowerCase()}`}>
      <HStack>
        <h2>Top {topic}</h2>
        <Dropdown
          selected={sortBy}
          options={repositorySortByOptions}
          onSelect={(value) => setSortBy(value as RepositorySortBy)}
        />
      </HStack>
      {isLoading && <LoadingState>Loading data...</LoadingState>}
      {carouselSlides.length > 0 && (
        <Carousel
          slides={carouselSlides}
          options={{
            slidesToScroll: "auto",
            containScroll: "trimSnaps",
            draggable: false,
          }}
          onSlideClick={onSlideClick}
          onBookmarkClick={onBookmarkClick}
          withBookmarks={!!user}
        />
      )}
    </VStack>
  );
};

export default Topic;
