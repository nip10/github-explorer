import Topic from "./Topic";
import HiddenCheckbox, {
  type HiddenCheckboxProps,
} from "@/components/ui/HiddenCheckbox";
import Pill from "@/components/ui/Pill";
import { EmptyState, HStack, Section, VStack } from "@/components/ui/Shared";
import useLocalStorage from "@/hooks/useLocalStorage";

const supportedTopics = [
  "Vue",
  "TypeScript",
  "JavaScript",
  "Go",
  "CSS",
  "React",
] as const;
type SupportedTopics = typeof supportedTopics[number];

const Topics: React.FC = () => {
  const [selectedTopics, setSelectedTopics] = useLocalStorage<
    SupportedTopics[]
  >("topics", ["Vue", "Go"]);

  const onTopicChange: HiddenCheckboxProps["onChange"] = (e) => {
    const { checked } = e.target;
    const value = e.target.value as SupportedTopics;
    if (checked) {
      setSelectedTopics([...selectedTopics, value]);
    } else {
      setSelectedTopics(selectedTopics.filter((topic) => topic !== value));
    }
  };

  return (
    <Section>
      <h4>Toggle topics to show</h4>
      <HStack>
        {supportedTopics.map((topic) => (
          <HiddenCheckbox
            key={topic}
            defaultChecked={selectedTopics.includes(topic)}
            onChange={onTopicChange}
            value={topic}
            renderValue={(checked, value) => (
              <Pill variant={checked ? "primary" : "secondary"}>{value}</Pill>
            )}
          />
        ))}
      </HStack>
      {selectedTopics.length === 0 ? (
        <EmptyState>No topics selected.</EmptyState>
      ) : (
        <VStack gap="1rem">
          {selectedTopics.map((topic) => (
            <Topic key={topic} topic={topic} />
          ))}
        </VStack>
      )}
    </Section>
  );
};

export default Topics;
