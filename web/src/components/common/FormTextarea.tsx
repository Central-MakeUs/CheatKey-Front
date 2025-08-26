import { cn } from "@/lib/cn";

export interface FormTextareaProps {
  id: string;
  maxLength: number;
  type: "AI" | "Write";
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export const FormTextarea = ({
  id,
  maxLength,
  type,
  placeholder,
  value,
  onChange,
}: FormTextareaProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= maxLength) {
      onChange(event.target.value);
    }
  };

  const counterId = `${id}-counter`;

  return (
    <div
      className={cn(
        "focus-within:border-primary-400 relative flex h-34 w-full shrink-0 flex-col justify-between gap-3 overflow-hidden rounded-[.625rem] border bg-transparent p-3 transition-colors duration-300",
        {
          "border-[#3D425C]": type === "AI",
          "border-gray-system-700": type === "Write",
        },
      )}
    >
      <textarea
        id={id}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        placeholder={placeholder}
        aria-describedby={counterId}
        className="body-5-regular text-gray-system-400 placeholder:text-gray-system-600 h-full w-full resize-none border-none bg-transparent focus:outline-none"
      />
      <div
        id={counterId}
        aria-live="polite"
        aria-atomic="true"
        className="caption-1-medium text-gray-system-600 h-6 w-full"
      >
        {value.length} / {maxLength}
      </div>
    </div>
  );
};
