import { useNavigate } from "react-router-dom";
import useCart from "../stores/cart.js";

function Cart() {
  const items = useCart((state) => state.items);
  const updateQuantity = useCart((state) => state.updateQuantity);
  const removeFromCart = useCart((state) => state.removeFromCart);
  const clearCart = useCart((state) => state.clearCart);
  const navigate = useNavigate();

  const handleCheckout = () => {
    clearCart();
    navigate("/checkout-success");
  };

  const handleQuantityChange = (productId, amount) => {
    const product = items.find((item) => item.id === productId);
    if (!product) return;

    const newQuantity = product.quantity + amount;
    updateQuantity(productId, newQuantity);
  };

  const handleInputChange = (event, productId) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity)) {
      updateQuantity(productId, newQuantity);
    }
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {items.length > 0 ? (
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="mb-4 p-4 border rounded flex items-center justify-between gap-8"
            >
              <div>
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p>Price: ${item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="text-blue-500 px-2 py-1 border rounded"
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(event) => handleInputChange(event, item.id)}
                  className="w-12 text-center border rounded"
                  min="0"
                />
                <button
                  onClick={() => handleQuantityChange(item.id, 1)}
                  className="text-blue-500 px-2 py-1 border rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 px-2 py-1 border rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right mt-4">
            <h2 className="text-xl font-semibold">
              Total: ${total.toFixed(2)}
            </h2>
          </div>
          <button
            onClick={handleCheckout}
            className="bg-green-500 text-white p-2 rounded"
          >
            Checkout
          </button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default Cart;
