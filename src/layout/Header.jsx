import { Link } from "react-router-dom";
import useCart from "../stores/cart.js";

export function Header() {
  const items = useCart((state) => state.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

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
          <Link to={"/cart"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#ffffff"
              viewBox="0 0 256 256"
              className="relative"
            >
              <path d="M230.14,58.87A8,8,0,0,0,224,56H62.68L56.6,22.57A8,8,0,0,0,48.73,16H24a8,8,0,0,0,0,16h18L67.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,160,204a28,28,0,1,0,28-28H91.17a8,8,0,0,1-7.87-6.57L80.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,230.14,58.87ZM104,204a12,12,0,1,1-12-12A12,12,0,0,1,104,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,200,204Zm4-74.57A8,8,0,0,1,196.1,136H77.22L65.59,72H214.41Z"></path>
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </section>
      </nav>
    </header>
  );
}
