import create from 'zustand'

export const useAuthStore = create((set) => ({
    enteredEmail: "",
    enteredPassword: "",
    currentUsername: "",
    currentUserAvatar: "",
    currentFname: "",
    currentLname: "",
    accessToken: "",
    uid: "",
    familyUID: "",
    errorMessage: "",
    votes: 0,
    loading: false,
    admin: false,
    SuperAdmin: false,
    mealVotedFor: "",
    setEnteredEmail: (newEmail) => set((state) => ({ enteredEmail: newEmail })),
    setEnteredPassword: (newPassword) => set((state) => ({ enteredPassword: newPassword })),
    setCurrentUsername: (newUsername) => set((state) => ({ currentUsername: newUsername })),
    setCurrentFname: (newFname) => set((state) => ({ currentFname: newFname })),
    setCurrentLname: (newLname) => set((state) => ({ currentLname: newLname })),
    setCurrentUserAvatar: (newUserAvatar) => set((state) => ({ currentUserAvatar: newUserAvatar })),
    setAccessToken: (newAccessToken) => set((state) => ({ accessToken: newAccessToken })),
    setUID: (newUID) => set((state) => ({ uid: newUID })),
    setFamilyUID: (newFamilyUID) => set((state) => ({ familyUID: newFamilyUID })),
    setErrorMessage: (newErrorMessage) => set((state) => ({ errorMessage: newErrorMessage })),
    setVotes: (newUserVotes) => set((state) => ({ votes: newUserVotes })),
    setLoading: (newLoadingState) => set((state) => ({ loading: newLoadingState })),
    setAdmin: (newAdminRole) => set((state) => ({ admin: newAdminRole })),
    setSuperAdmin: (newSuperAdminRole) => set((state) => ({ SuperAdmin: newSuperAdminRole })),
    setMealVotedFor: (newMealVotedFor) => set((state) => ({ mealVotedFor: newMealVotedFor })),
}))