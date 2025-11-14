import { create } from "zustand";
import { Product } from "@/types/product";

interface ProductStore {
  products: Product[];
  setProducts: (items: Product[]) => void;
  clearProducts: () => void;
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (items) => set({ products: items }),
  clearProducts: () => set({ products: [] }),
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
  removeProduct: (id) =>
    set((state) => ({ products: state.products.filter((p) => p.id !== id) })),
}));
