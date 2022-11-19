import create from 'zustand'

export const useMealFilterStore = create((set) => ({
    order: "asc",
    rating: "",
    setOrder: (newOrderValue) => set((state) => ({ order: newOrderValue })),
    setRating: (newRatingValue) => set((state) => ({ rating: newRatingValue }))
}))