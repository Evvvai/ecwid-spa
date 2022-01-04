import { Locales, Theme, ViewportCategory } from '@/types'

// =======================================================================================
// App
// =======================================================================================

export interface AppState {
  isLoad: boolean

  viewportCategory: ViewportCategory
  language: Locales
  theme: Theme

  error: string | null
}
