import DesktopSidebar from "./DesktopSidebar";
import MobileFotter from "./MobileFotter";
import getCurrentUser from "@/app/actions/getCurrentUser";

async function Sidebar({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();
  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFotter />
      <main className="lg:pl-20 bg-gray-800 h-full">{children}</main>
    </div>
  );
}

export default Sidebar;
