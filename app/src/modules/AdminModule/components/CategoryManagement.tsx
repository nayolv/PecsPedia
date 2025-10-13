import { useCategories } from "@/app/src/hooks/useCategories"
import { Text, View } from "react-native"

export const CategoryManagement = () => {
  const { categories } = useCategories()
  return (
    <View>
      {categories.map(picto => (
        <Text>Categorias</Text>
        // <ListItem picto={picto} key={picto.id} />
      ))}
    </View>
  )
}
