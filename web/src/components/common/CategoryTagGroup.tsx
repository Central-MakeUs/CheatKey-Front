import { cn } from "@/utils/cn";

interface CategoryTagGroupProps {
  tags: string[];
  selected: string;
  onSelect: (tag: string) => void;
}

export const CategoryTagGroup: React.FC<CategoryTagGroupProps> = ({
  tags,
  selected,
  onSelect,
}) => {
  return (
    <div className="flex gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onSelect(tag)}
          className={cn(
            "body-2-medium min-width-20 h-9 content-center rounded-full px-2 transition-colors",
            selected === tag
              ? "bg-primary-400 text-base-0"
              : "bg-bg-50 text-gray-system-500",
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};
