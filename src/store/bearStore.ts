import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface BearsState {
  data: number
  increase: (by: number) => void
}

export const useBearsStore = create<BearsState>()(
  devtools(
    persist(
      (set) => ({
        data: 0,
        increase: (by) => set((state) => ({ data: state.data + by })),
      }),
      { name: 'bears-storage' }
    )
  )
)
