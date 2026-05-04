import { createContext, useContext, useReducer, useEffect } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const CART_KEY = "shopswift_cart";

// ─── Action types ──────────────────────────────────────────────────────────────
const ADD_ITEM      = "ADD_ITEM";
const REMOVE_ITEM   = "REMOVE_ITEM";
const UPDATE_QTY    = "UPDATE_QTY";
const CLEAR_CART    = "CLEAR_CART";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const calcTotals = (items) => ({
  totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
  totalPrice: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
});

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (items) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {
    // localStorage quota exceeded — silently ignore
  }
};

// ─── Reducer ──────────────────────────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {

    case ADD_ITEM: {
      const { product, quantity = 1 } = action.payload;
      const existing = state.find((i) => i._id === product._id);

      if (existing) {
        // Increment — respect stock ceiling
        return state.map((i) =>
          i._id === product._id
            ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) }
            : i
        );
      }
      // New item — store only the fields the cart needs
      return [
        ...state,
        {
          _id:      product._id,
          name:     product.name,
          price:    product.price,
          image:    product.image,
          category: product.category,
          stock:    product.stock,
          quantity: Math.min(quantity, product.stock),
        },
      ];
    }

    case UPDATE_QTY: {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return state.filter((i) => i._id !== id);
      }
      return state.map((i) =>
        i._id === id
          ? { ...i, quantity: Math.min(quantity, i.stock) }
          : i
      );
    }

    case REMOVE_ITEM:
      return state.filter((i) => i._id !== action.payload.id);

    case CLEAR_CART:
      return [];

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], loadFromStorage);

  // Sync to localStorage whenever items change
  useEffect(() => {
    saveToStorage(items);
  }, [items]);

  // ── Public API ──────────────────────────────────────────────────────────────
  const addItem = (product, quantity = 1) =>
    dispatch({ type: ADD_ITEM, payload: { product, quantity } });

  const removeItem = (id) =>
    dispatch({ type: REMOVE_ITEM, payload: { id } });

  const updateQuantity = (id, quantity) =>
    dispatch({ type: UPDATE_QTY, payload: { id, quantity } });

  const clearCart = () =>
    dispatch({ type: CLEAR_CART });

  const isInCart = (id) => items.some((i) => i._id === id);

  const getItemQuantity = (id) => {
    const item = items.find((i) => i._id === id);
    return item ? item.quantity : 0;
  };

  const { totalItems, totalPrice } = calcTotals(items);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isInCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

export default CartContext;
