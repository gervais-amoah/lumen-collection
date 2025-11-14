import { create } from "zustand";
import { Product } from "@/types/product";

interface ProductStore {
  products: Product[];
  setProducts: (items: Product[]) => void;
  clearProducts: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (items) => set({ products: items }),
  clearProducts: () => set({ products: [] }),
}));
