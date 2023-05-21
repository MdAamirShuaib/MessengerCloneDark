"use client";

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from '@/app/hooks/useActiveList'

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const otherUser = useOtherUser(conversation);
  const {members} = useActiveList()
  const isActive = members.indexOf(otherUser?.email!) !== -1
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? "Active" : "Offline";
  }, [conversation, isActive]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className="flex bg-gray-700 w-full border-b-[1px] border-gray-600 sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            className="lg:hidden block rounded-full items-center justify-center p-2 bg-gray-700 text-slate-300 cursor-pointer hover:bg-gray-800 transition"
            href="/conversations/"
          >
            <HiChevronLeft size={32} className="" />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div className="text-white font-semibold">
              {conversation.name || otherUser.name}
            </div>
            <div className="text-sm font-light text-gray-400">{statusText}</div>
          </div>
        </div>
        <div className="rounded-full p-2 bg-gray-700 text-slate-300 cursor-pointer hover:bg-gray-800 transition">
          <HiEllipsisHorizontal onClick={() => setDrawerOpen(true)} size={32} />
        </div>
      </div>
    </>
  );
};

export default Header;
