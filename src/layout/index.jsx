import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

function Layout() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="grow max-w-7xl mx-auto my-10 ">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export { Header, Footer, Layout };
