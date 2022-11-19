import create from 'zustand'

export const useAuthStore = create((set) => ({
    enteredEmail: "",
    enteredPassword: "",
    currentUsername: "",
    currentUserAvatar: "",
    currentFname: "",
    accessToken: "",
    uid: "",
    errorMessage: "",
    votes: 0,
    setEnteredEmail: (newEmail) => set((state) => ({ enteredEmail: newEmail })),
    setEnteredPassword: (newPassword) => set((state) => ({ enteredPassword: newPassword })),
    setCurrentUsername: (newUsername) => set((state) => ({ currentUsername: newUsername })),
    setCurrentFname: (newFname) => set((state) => ({ currentFname: newFname })),
    setCurrentUserAvatar: (newUserAvatar) => set((state) => ({ currentUserAvatar: newUserAvatar })),
    setAccessToken: (newAccessToken) => set((state) => ({ accessToken: newAccessToken })),
    setUID: (newUID) => set((state) => ({ uid: newUID })),
    setErrorMessage: (newErrorMessage) => set((state) => ({ errorMessage: newErrorMessage })),
    setVotes: (newUserVotes) => set((state) => ({ votes: newUserVotes })),
}))