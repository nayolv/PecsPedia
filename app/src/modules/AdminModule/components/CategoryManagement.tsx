import { RoundedButton } from "@/app/src/components/Buttons/RoundedButton/RoundedButton"
import { CollapsibleSearchBar } from "@/app/src/components/Inputs/SearchBar/CollapsibleSearchBar"
import { Alert, FlatList, StyleSheet, View } from "react-native"
import { useCategoryManagement } from "../hooks/useCategoryManagement"
import { CategoryManagementProps, CatParams } from "../models/managementModels"
import { ListItem } from "./Lists/ListItem"

const TODOS_CATEGORY_ID = 'todos';

export const CategoryManagement = ({ categories, pictograms, onDelete }: CategoryManagementProps) => {
  const {
    searchQuery,
    setSearchQuery,
    filteredCategories,
    onUpdateCat,
    onCreateCat,
    numColumns
  } = useCategoryManagement(categories)

  const handleDeleteCategory = (categoryId: string) => {
    if (categoryId === TODOS_CATEGORY_ID) {
      Alert.alert(
        'No se puede eliminar',
        'La categoría "Todos" es obligatoria y no puede ser eliminada.',
        [{ text: 'OK', onPress: () => { } }]
      );
      return;
    }
    onDelete(categoryId);
  }

  return (
    <View style={styles.container}>
      <View style={styles.filtersContainer}>
        <CollapsibleSearchBar
          style={styles.searchBar}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Buscar categorías..."
        />
        <RoundedButton
          icon="plus"
          onPress={onCreateCat}
          iconStyle={{
            color: '#333'
          }}
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 25,
            backgroundColor: '#f0f0f0',
          }}
        />
        {/* <TouchableOpacity
          style={styles.addButton}
          onPress={onCreateCat}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="plus" size={24} color="#6BAABB" />
        </TouchableOpacity> */}
      </View>
      <FlatList
        key={numColumns}
        data={filteredCategories}
        keyExtractor={(cat) => `${cat.id}`}
        numColumns={numColumns}
        contentContainerStyle={styles.listContent}
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
            onDelete={() => handleDeleteCategory(item.id)}
          />
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
    minHeight: 60,
    gap: 10,
  },
  searchBar: {
    marginBottom: 0
  },
  listContent: {
    paddingTop: 5,
    paddingBottom: 20,
  },
  addButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
