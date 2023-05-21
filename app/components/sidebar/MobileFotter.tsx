"use client";

import useRoutes from "@/app/hooks/useRoutes";
import useConversation from "./../../hooks/useConversation";
import MobileItem from "./MobileItem";

const MobileFotter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) return null;
  return (
    <div className="fixed bottom-0 w-full z-40 flex justify-between items-center bg-gray-800 lg:hidden">
      {routes.map((route) => (
        <MobileItem
          key={route.label}
          href={route.href}
          label={route.label}
          icon={route.icon}
          active={route.active}
          onClick={route.onClick}
        />
      ))}
    </div>
  );
};

export default MobileFotter;
