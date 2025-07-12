import { NavLink } from "react-router-dom";

interface BottomNavBarItemProps {
  to: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  FocusedIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const BottomNavBarItem = ({ to, Icon, FocusedIcon }: BottomNavBarItemProps) => (
  <NavLink to={to}>
    {({ isActive }) =>
      isActive ? (
        <FocusedIcon className="h-15 w-15" />
      ) : (
        <Icon className="h-15 w-15" />
      )
    }
  </NavLink>
);

export default BottomNavBarItem;
