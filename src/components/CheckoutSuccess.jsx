import { useNavigate } from "react-router-dom";

function CheckoutSuccess() {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Checkout Successful!</h1>
      <p className="mb-4">Hope you enjoy your order</p>
      <button
        onClick={handleContinueShopping}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default CheckoutSuccess;
