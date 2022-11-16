import create from 'zustand'

export const useMealStore = create((set) => ({
    meals: "_",
    // increasePopulation: () => set((state) => ({ meals: state.meals + 1 })),
    increasePopulation: () => set((state) => ({ meals: "food" })),
    populateMeals: (data) => set((state) => ({ data })),
    removeAllBears: () => set({ meals: 0 }),
}))