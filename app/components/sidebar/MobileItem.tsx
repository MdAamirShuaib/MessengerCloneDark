"use client";

import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const MobileItem: React.FC<MobileItemProps> = ({
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
    <Link
      onClick={handleClick}
      className={clsx(
        `group flex items-center gap-x-3 justify-center
        rounded-md p-4 text-sm leading-6 w-full
        font-semibold text-slate-300 hover:text-white hover:bg-slate-700`,
        active && "bg-slate-700 text-white"
      )}
      href={href}
    >
      <Icon className="h-6 w-6 shrink-0" />
    </Link>
  );
};

export default MobileItem;
