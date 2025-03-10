import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const api = "https://v2.api.noroff.dev/online-shop";

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(api);
      const data = await response.json();
      setProducts(data.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  return (
    <>
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search products here"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <div className="flex justify-center flex-wrap gap-4">
        {filteredProducts.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="text-decoration-none"
          >
            <div className="max-w-72 h-full p-4 border flex flex-col gap-4 relative">
              <img
                src={product.image.url}
                alt={product.image.alt}
                className="w-full h-48 object-cover"
              />
              <h2 className="text-2xl">{product.title}</h2>
              {product.discountedPrice &&
              product.discountedPrice < product.price ? (
                <div className="flex gap-2">
                  <p style={{ textDecoration: "line-through" }}>
                    Price: ${product.price}
                  </p>
                  <p className="text-red-800 font-bold">
                    Sale: ${product.discountedPrice}
                  </p>
                </div>
              ) : (
                <p>Price: ${product.price}</p>
              )}
              <p>Rating: {product.rating}</p>
              <p>Tags: {product.tags.join(", ")}</p>
              <p>{product.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Home;
