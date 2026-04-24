import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navba";
import AnnouncementBar from "../AnnouncementBar/AnnouncementBar";
import Footer from "../Footer/Footer";
import FloatingButtons from "../Floatingbuttons/Floatingbuttons";
import Pageloader from "../Pageloader/Pageloader";
// import Cursor from "../Cursor/Cursor";
export default function Layout() {
  // const location = useLocation();
  // // const isDashboard = location.pathname.startsWith("/dashboard");

  // if (isDashboard) return <Outlet />;

  return (
    <>
      <AnnouncementBar />

      <Navbar />

      <main className="relative isolate min-h-[52vh] w-full">
        <Suspense fallback={<Pageloader variant="inline" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
