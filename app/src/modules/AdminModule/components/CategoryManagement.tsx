import { RoundedButton } from "@/app/src/components/Buttons/RoundedButton/RoundedButton"
import { SearchBar } from "@/app/src/components/Inputs/SearchBar/SearchBar"
import { FlatList, StyleSheet, View } from "react-native"
import { useCategoryManagement } from "../hooks/useCategoryManagement"
import { CategoryManagementProps, CatParams } from "../models/managementModels"
import { fabBtnStyles } from "../utils/stylesUtils"
import { ListItem } from "./Lists/ListItem"

export const CategoryManagement = ({ categories, pictograms, onDelete }: CategoryManagementProps) => {
  const {
    searchQuery,
    setSearchQuery,
    filteredCategories,
    onUpdateCat,
    onCreateCat,
    numColumns
  } = useCategoryManagement(categories)

  return (
    <View style={styles.container}>
      <View style={styles.filtersContainer}>
        <SearchBar
          style={styles.searchBar}
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
        icon='plus'
        style={fabBtnStyles}
        onPress={onCreateCat}
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
    paddingHorizontal: 10,
  },
  searchBar: {
    width: 300,
    marginBottom: 0
  }
})
