import { Link, useLocation } from "react-router-dom";

import { cn } from "@/lib/cn";

interface BottomNavBarItemProps {
  path: string;
  DefaultIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  ActiveIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
}

export const BottomNavBarItem = ({
  path,
  DefaultIcon,
  ActiveIcon,
  label,
}: BottomNavBarItemProps) => {
  const location = useLocation();

  const isActive = location.pathname === path;

  return (
    <Link
      to={path}
      aria-current={isActive ? "page" : undefined}
      className="flex h-15 w-15 flex-col items-center justify-center gap-[0.1875rem]"
    >
      {isActive ? (
        <ActiveIcon className="h-8 w-8" />
      ) : (
        <DefaultIcon className="h-8 w-8" />
      )}
      <span
        className={cn("caption-1-medium", {
          "text-primary-300": isActive,
          "text-gray-system-600": !isActive,
        })}
      >
        {label}
      </span>
    </Link>
  );
};
