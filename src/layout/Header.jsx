import { Link } from "react-router-dom";
import { CartIcon } from "../components/CartIcon.jsx";

export function Header() {
  return (
    <header>
      <nav className="flex justify-between items-center h-14 bg-[#00a3fc] text-white px-4">
        <section>
          <Link to={"/"}>
            <img src="/online-shop-sm.webp" alt="Logo" className="w-12" />
          </Link>
        </section>
        <section className="flex justify-between items-center gap-2">
          <Link to={"/"}>Home</Link>
          <Link to={"/contact"}>Contact</Link>
        </section>
        <section className="relative">
          <CartIcon />
        </section>
      </nav>
    </header>
  );
}
