import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const truncateWords = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  const shortDescription = truncateWords(product.description, 10);
  return (
    <div className="max-w-72 h-full p-4 border flex flex-col gap-4 relative">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image.url}
          alt={product.image.alt || "Product Image"}
          className="w-full h-48 object-cover mb-4"
        />
      </Link>
      <h2 className="text-xl font-semibold">{product.title}</h2>
      <p className="mb-2">{shortDescription}</p>
      <div className="mb-2">
        {product.discountedPrice && product.discountedPrice < product.price ? (
          <>
            <p className="text-gray-500 line-through">
              Price: ${product.price}
            </p>
            <p className="text-red-800 font-bold">
              Sale: ${product.discountedPrice}
            </p>
          </>
        ) : (
          <p>Price: ${product.price}</p>
        )}
      </div>
      <p>Rating: {product.rating}</p>
      <p>
        Tags:{" "}
        {product.tags && product.tags.length > 0
          ? product.tags.join(", ")
          : "No tags available"}
      </p>
      <Link
        to={`/product/${product.id}`}
        className="text-center mt-2 text-white bg-blue-500 h-9 flex items-center justify-center rounded cursor-pointer hover:bg-blue-600"
      >
        View Product
      </Link>
    </div>
  );
}

export default ProductCard;
