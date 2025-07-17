import { cn } from "@/utils/cn";

interface NameTagProps {
  name: string;
  type: "home" | "community_mono" | "community_primary";
  className?: string;
}
export const NameTag = ({ name, type, className }: NameTagProps) => {
  return (
    <div
      className={cn(
        "w-fit truncate px-[0.4375rem] py-1",
        {
          "body-4-medium text-gray-system-500 bg-bg-50 rounded-lg":
            type === "community_mono",
          "body-4-medium text-primary-300 bg-bg-50 rounded-lg":
            type === "community_primary",
          "caption-1-medium text-primary-200 bg-primary-400/20 border-primary-600 rounded-full border-[0.5px]":
            type === "home",
        },
        className,
      )}
    >
      {name}
    </div>
  );
};
