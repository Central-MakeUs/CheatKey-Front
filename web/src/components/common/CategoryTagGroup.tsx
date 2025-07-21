import { cn } from "@/utils/cn";

interface CategoryTagGroupProps {
  tags: string[];
  selected: string;
  onSelect: (tag: string) => void;
  className?: string;
}

export const CategoryTagGroup: React.FC<CategoryTagGroupProps> = ({
  tags,
  selected,
  onSelect,
  className,
}) => {
  return (
    <div
      className={cn("flex flex-wrap gap-x-2 gap-y-2", className)}
      role="radiogroup"
    >
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          role="radio"
          aria-checked={selected === tag}
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
