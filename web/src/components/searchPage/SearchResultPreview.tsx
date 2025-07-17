import { useNavigate } from "react-router-dom";

import { path } from "@/routes/path";

interface SearchResultItemProps {
  id: number;
  title: string;
  content: string;
}

export const SearchResultPreview = ({
  id,
  title,
  content,
}: SearchResultItemProps) => {
  const navigate = useNavigate();

  return (
    <div
      role="link"
      onClick={() => navigate(path.community.detail(String(id)))}
      className="active:bg-gray-system-800 cursor-pointer rounded-xl px-1 py-3 transition"
    >
      <h2 className="body-2-medium text-gray-system-200 mb-1 line-clamp-1">
        {title}
      </h2>
      <p className="body-5-regular text-gray-system-500 line-clamp-2">
        {content}
      </p>
    </div>
  );
};
