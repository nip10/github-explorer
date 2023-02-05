import { useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import useRepositories, { RepositorySortBy } from "@/lib/api/useRepositories";
import useCreateBookmark from "@/lib/supabase/useCreateBookmark";
import Carousel, { type SlideType } from "@/components/ui/Carousel";
import Dropdown, { type DropdownOption } from "@/components/ui/Dropdown";
import { HStack, LoadingState } from "@/components/ui/Shared";

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
  const [sortBy, setSortBy] = useState<RepositorySortBy>("stars");

  const { data, isLoading } = useRepositories({
    language: topic.toLowerCase(),
    sortBy,
  });
  const carouselSlides =
    data?.repositories.items.map((item) => ({
      img: item.image,
      alt: `Summary of ${item.fullName} repository information`,
    })) ?? [];

  const createBookmark = useCreateBookmark();

  const onSlideClick = (slide: SlideType, index: number) => {
    const repoUrl = data?.repositories.items[index].url;
    if (repoUrl) {
      window.open(repoUrl, "_blank", "noreferrer");
    }
  };

  const onBookmarkClick = async (slide: SlideType, index: number) => {
    const repo = data?.repositories.items[index];
    if (repo) {
      const { repoOwner, repoName, url, image } = repo;
      await createBookmark(repoOwner, repoName, url, image);
    }
  };

  return (
    <>
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
    </>
  );
};

export default Topic;
