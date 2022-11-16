import create from 'zustand'

export const useVoteStore = create((set) => ({
    votes: 0,
    increaseVote: () => set((state) => ({ votes: state.votes + 1 })),
    removeAllBears: () => set({ votes: 0 }),
}))