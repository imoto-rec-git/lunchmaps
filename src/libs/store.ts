import { create } from 'zustand'

const useStore = create((set) => ({
  currentLat: 0,
  currentLng: 0,
  // increase: () => set((state) => ({ count: state.count + 1 })),
  // decrease: () => set((state) => ({ count: state.count - 1 })),
  // reset: () => set({ count: 0 })

  position: () =>
    set((position: { currentLat: number }) => ({
      currentLat: position.currentLat + 1,
    })),
}))

export default useStore
