import { PageIndicator } from "../common/PageIndicator";

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
  total,
  step,
}: OnboardingContentProps) => {
  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2.5 px-5">
      <div className="flex w-full flex-col gap-2 text-center">
        <h1 className="head-2-semibold text-base-0">{title}</h1>
        <h2 className="body-2-medium text-gray-system-400 whitespace-pre-line">
          {subTitle}
        </h2>
      </div>
      <img src={image} className="h-auto w-full" />
      <PageIndicator
        total={total}
        current={step}
        indicatorColor="bg-primary-400"
        className="pt-6"
      />
    </div>
  );
};
