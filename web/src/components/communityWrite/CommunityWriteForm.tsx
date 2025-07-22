import { FormTextarea } from "@/components/common/FormTextarea";

export const CommunityWriteForm = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  return (
    <div>
      <h1 className="head-4-semibold text-base-0 pb-3">
        내용을 입력해주세요.<span className="text-primary-400">*</span>
      </h1>
      <FormTextarea
        id="community_write"
        value={value}
        type="Write"
        onChange={onChange}
        maxLength={500}
        placeholder="최소 10자 이상 작성해주세요."
      />
    </div>
  );
};
