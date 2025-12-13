import { RoundedButton } from "@/app/src/components/Buttons/RoundedButton/RoundedButton"
import { SearchBar } from "@/app/src/components/Inputs/SearchBar/SearchBar"
import { useDynamicColumns } from "@/app/src/hooks/useDynamicColumns"
import { useNavigate } from "@/app/src/hooks/useNavigate"
import { childRoutes } from "@/app/src/router/routes"
import { useMemo, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { CategoryManagementProps, CatParams } from "../models/managementModels"
import { fabBtnStyles, iconStyle } from "../utils/stylesUtils"
import { ListItem } from "./Lists/ListItem"

export const CategoryManagement = ({ categories, pictograms, onDelete }: CategoryManagementProps) => {
  const navigate = useNavigate()
  const { numColumns } = useDynamicColumns()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCategories = useMemo(() => categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  ), [categories, searchQuery])

  const onUpdateCat = (params: CatParams) => {
    const inputParams: { [key: string]: any } = { ...params };
    navigate(childRoutes.createCategory, inputParams);
  }
  return (
    <View style={styles.container}>
      <View style={styles.filtersContainer}>
        <SearchBar
          style={{ width: '30%' }}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Buscar categorías..."
        />
      </View>
      <FlatList
        key={numColumns}
        data={filteredCategories}
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
        icon='plus'
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
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
})
