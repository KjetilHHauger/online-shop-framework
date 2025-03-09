import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCart from "../stores/cart.js";

const api = "https://v2.api.noroff.dev/online-shop";

function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const addToCart = useCart((state) => state.addToCart);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`${api}/${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data.data);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchProduct();
  }, [productId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  const discount = product.price - product.discountedPrice;
  const discountPercentage =
    discount > 0 ? ((discount / product.price) * 100).toFixed(2) : 0;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      {product.image && (
        <img
          src={product.image.url}
          alt={product.image.alt || "Product Image"}
          className="w-full h-[300px] object-cover mb-4"
        />
      )}
      <p className="mb-4">{product.description}</p>
      <div className="mb-4">
        {discountPercentage > 0 ? (
          <>
            <p className="text-gray-500 line-through">
              Price: ${product.price}
            </p>
            <p className="text-red-800 font-bold">
              Sale: ${product.discountedPrice} ({discountPercentage}% off)
            </p>
          </>
        ) : (
          <p>Price: ${product.price}</p>
        )}
      </div>
      <p className="mb-4">Rating: {product.rating}</p>
      <p className="mb-4">
        Tags:{" "}
        {product.tags && product.tags.length > 0
          ? product.tags.join(", ")
          : "No tags available"}
      </p>
      <div className="reviews mb-4">
        <h3 className="text-xl font-semibold mb-2">Reviews:</h3>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review) => (
            <div key={review.id} className="mb-2">
              <p>Username: {review.username}</p>
              <p>Rating: {review.rating}</p>
              <p>Description: {review.description}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
      <button
        onClick={handleAddToCart}
        className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default Product;
