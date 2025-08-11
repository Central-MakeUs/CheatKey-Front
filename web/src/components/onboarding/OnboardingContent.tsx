export interface OnboardingContentProps {
  title: string;
  subTitle: string;
  image: string;
  total: number;
  step: number;
}
export const OnboardingContent = ({
  title,
  subTitle,
  image,
}: OnboardingContentProps) => {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-2.5 px-5 pt-5">
      <div className="flex w-full flex-col gap-2 text-center">
        <h1 className="head-2-semibold text-base-0">{title}</h1>
        <h2 className="body-2-medium text-gray-system-400 whitespace-pre-line">
          {subTitle}
        </h2>
      </div>
      <img src={image} className="h-auto w-full max-w-2xl" />
    </div>
  );
};
