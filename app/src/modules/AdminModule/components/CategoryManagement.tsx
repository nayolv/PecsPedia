import { RoundedButton } from "@/app/src/components/Buttons/RoundedButton/RoundedButton"
import { useDynamicColumns } from "@/app/src/hooks/useDynamicColumns"
import { useNavigate } from "@/app/src/hooks/useNavigate"
import { childRoutes } from "@/app/src/router/routes"
import { FlatList, StyleSheet, View } from "react-native"
import { CategoryManagementProps, CatParams } from "../models/managementModels"
import { fabBtnStyles, iconStyle } from "../utils/stylesUtils"
import { ListItem } from "./Lists/ListItem"

export const CategoryManagement = ({ categories, pictograms, onDelete }: CategoryManagementProps) => {
  const navigate = useNavigate()
  const { numColumns } = useDynamicColumns()

  const onUpdateCat = (params: CatParams) => {
    const inputParams: { [key: string]: any } = { ...params };
    navigate(childRoutes.createCategory, inputParams);
  }
  return (
    <View style={styles.container}>
      <FlatList
        key={numColumns}
        data={categories}
        keyExtractor={(cat) => `${cat.id}`}
        numColumns={numColumns}
        renderItem={({ item }) => {
          const pictogramsByCat = pictograms?.filter((picto) => picto.categoryIds.includes(item.id) && picto.imageUri != null)

          const params: CatParams = {
            category: JSON.stringify(item),
            categories: JSON.stringify(categories),
            pictograms: JSON.stringify(pictogramsByCat),
          }

          return <ListItem
            key={item.id}
            text={item.name}
            color={item?.color}
            imageUri={item.imageUri}
            columns={numColumns}
            onUpdate={() => onUpdateCat(params)}
            onDelete={() => onDelete(item.id)}
          />
        }}
      />
      <RoundedButton
        onPress={() => navigate(childRoutes.createCategory, { categories: JSON.stringify(categories) })}
        icon='plus-circle-outline'
        btnStyle={fabBtnStyles}
        iconStyle={iconStyle}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
})
