import { create } from "zustand";
import interceptor from "../interceptor";

const MenuService = create((set, get) => ({

    beverages: [],
    lunches: [],
    meals:[],
    currentPage: 0,
    totalPages: 0,
    error: null,

    getBeverages: async (page, size) => {
        try {
            const response = await interceptor.get(`/menu/beverages?page=${page}&size=${size}`);
            set({ beverages: response.data.content, totalPages: response.data.page.totalPages, currentPage: response.data.page.number });
        } catch (error) {
            set({ error: "There is an error during retrieving beverages"});
        }
    },
    getLunches: async (page, size) => {
        try {
            const response = await interceptor.get(`/menu/lunches?page=${page}&size=${size}`);
            set({lunches: response.data.content, totalPages: response.data.page.totalPages, currentPage: response.data.page.number});
        }
        catch (error) {
            set({ error: "There is an error during getLunches"});
        }
    },
    getMeals :async  (page,size)=>{
        try {
            const response = await interceptor.get(`/menu/meals?page=${page}&size=${size}`);
            set({meals: response.data.content, totalPages: response.data.page.totalPages, currentPage: response.data.page.number});
        }
        catch (error) {
            set({ error: "There is an error during getMeals"});
        }
    }
}));

export default MenuService;
