import create from 'zustand'

export const useAuthStore = create((set) => ({
    enteredEmail: "",
    enteredPassword: "",
    currentUsername: "",
    accessToken: "",
    uid: "",
    errorMessage: "",
    setEnteredEmail: (newEmail) => set((state) => ({ enteredEmail: newEmail })),
    setEnteredPassword: (newPassword) => set((state) => ({ enteredPassword: newPassword })),
    setCurrentUsername: (newUsername) => set((state) => ({ currentUsername: newUsername })),
    setAccessToken: (newAccessToken) => set((state) => ({ accessToken: newAccessToken })),
    setUID: (newUID) => set((state) => ({ uid: newUID })),
    setErrorMessage: (newErrorMessage) => set((state) => ({ errorMessage: newErrorMessage })),

}))