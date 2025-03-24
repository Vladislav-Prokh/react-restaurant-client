import { create } from "zustand";

const MenuService = create((set, get) => ({

    beverages: [],
    lunches: [],
    currentPage: 0,
    totalPages: 0,
    error: null,

    getBeverages: async (page, size) => {
        try {
            const response = await fetch(`http://localhost:8081/menu/beverages?page=${page}&size=${size}`);
            const data = await response.json();
            set({ beverages: data.content, totalPages: data.page.totalPages, currentPage: data.page.number });
        } catch (error) {
            set({ error: "There is an error during retrieving beverages" });
        }
    },

     getLunches: async (page, size) => {
        try {
            const response = await fetch(`http://localhost:8081/menu/lunches?page=${page}&size=${size}`);
            const data = await response.json();
            set({lunches: data.content, totalPages: data.page.totalPages, currentPage: data.page.number});
        }
        catch (error) {
            set({ error: "There is an error during getLunches" });
        }
    }


}));

export default MenuService;
