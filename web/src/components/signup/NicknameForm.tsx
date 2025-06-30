import { AppHeader } from "../common/AppHeader";

interface NicknameFormProps {
  nickname: string;
  setNickname: (e: string) => void;
  onPrev: () => void;
}
export const NicknameForm = ({ nickname, setNickname }: NicknameFormProps) => {
  return <div className="flex flex-1 flex-col"></div>;
};
