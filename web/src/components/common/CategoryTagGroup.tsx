import { cn } from "@/lib/cn";

interface CategoryTagGroupProps<T extends string> {
  tags: readonly T[];
  selected: T;
  onSelect: (tag: T) => void;
  className?: string;
}

export const CategoryTagGroup = <T extends string>({
  tags,
  selected,
  onSelect,
  className,
}: CategoryTagGroupProps<T>) => {
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
            "body-2-medium h-9 min-w-20 content-center rounded-full px-2 transition-colors duration-500",
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
