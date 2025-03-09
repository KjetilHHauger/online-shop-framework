import { create } from "zustand";

const useCart = create((set, get) => ({
  items: JSON.parse(localStorage.getItem("cart")) || [],

  addToCart: (product) => {
    const existingItem = get().items.find((item) => item.id === product.id);
    if (existingItem) {
      set({
        items: get().items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({ items: [...get().items, { ...product, quantity: 1 }] });
    }
    localStorage.setItem("cart", JSON.stringify(get().items));
  },

  updateQuantity: (productId, newQuantity) => {
    if (newQuantity <= 0) {
      get().removeFromCart(productId);
    } else {
      set({
        items: get().items.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        ),
      });
    }
    localStorage.setItem("cart", JSON.stringify(get().items));
  },

  reduceQuantity: (productId) => {
    set({
      items: get()
        .items.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    });
    localStorage.setItem("cart", JSON.stringify(get().items));
  },

  removeFromCart: (productId) => {
    set({ items: get().items.filter((item) => item.id !== productId) });
    localStorage.setItem("cart", JSON.stringify(get().items));
  },

  clearCart: () => {
    set({ items: [] });
    localStorage.removeItem("cart");
  },
}));

export default useCart;
