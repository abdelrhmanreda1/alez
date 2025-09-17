import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../lib/axios";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Cart Items from API
  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await api.get("/cart");
      console.log("CART RESPONSE", res.data);

      const items = res.data.data?.cart_items || []; // ✅ cart_items من ال response
      setCartItem(items);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCartItem([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add to Cart
  const addToCart = async (product, quantity = 1) => {
    try {
      await api.post("/cart/add", {
        product_id: product.id,
        quantity,
      });
      toast.success(`${product.name} added to cart! 🛒`);
      fetchCart(); // refresh cart
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add product!");
    }
  };

  // ✅ Update Quantity
// ✅ Update Quantity
const updateQuantity = async (itemId, action) => {
  try {
    const item = cartItem.find((i) => i.id === itemId);
    if (!item) return;

    // 📌 هنا بنحدد الفرق فقط
    const delta = action === "increase" ? 1 : -1;

    // لو الكمية هتنزل لـ 0 أو أقل → احذف المنتج
    if (item.quantity + delta <= 0) {
      deleteItem(itemId);
      return;
    }

    // ابعت الفرق بس (مش الكمية كلها)
    await api.post("/cart/add", {
      product_id: item.product.id,
      quantity: delta,
    });

    toast.success(
      `Quantity ${action === "increase" ? "increased" : "decreased"}!`
    );
    fetchCart(); // رجع الكارت بعد التعديل
  } catch (err) {
    console.error("Error updating quantity:", err);
  }
};


  // ✅ Delete Item
  const deleteItem = async (itemId) => {
    try {
      await api.delete(`/cart/remove/${itemId}`);
      toast.success("Item removed from cart!");
      fetchCart();
    } catch (err) {
      console.error("Error deleting item:", err);
      toast.error("Failed to remove item!");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItem,
        setCartItem,
        addToCart,
        updateQuantity,
        deleteItem,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
