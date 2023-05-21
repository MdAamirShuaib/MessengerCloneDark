"use client";

import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <li onClick={handleClick} className="relative">
      <Link
        className={clsx(
          `
        group flex items-center gap-x-3 
        rounded-md p-3 text-sm leading-6 
        font-semibold text-slate-300 hover:text-white hover:bg-slate-700`,
          active && "bg-gray-800 text-white"
        )}
        href={href}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
