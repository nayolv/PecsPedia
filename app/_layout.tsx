import { CategoryProvider } from '@/app/src/contexts/CategoryContext'
import { PictogramProvider } from '@/app/src/contexts/PictogramContext'
import { Stack } from "expo-router"

export default function RootLayout() {
  return (
    <CategoryProvider>
      <PictogramProvider>
        <Stack />
      </PictogramProvider>
    </CategoryProvider>
  )
}