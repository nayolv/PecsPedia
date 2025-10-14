import { RoundedButton } from '@/app/src/components/Buttons/RoundedButton/RoundedButton'
import { useDynamicColumns } from '@/app/src/hooks/useDynamicColumns'
import { useNavigate } from '@/app/src/hooks/useNavigate'
import { childRoutes } from '@/app/src/router/routes'
import { ICategory, IPictogram } from '@/app/src/types/PyctogramTypes'
import { FlatList, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { ListItem } from './Lists/ListItem'
export interface PictoParams {
    picto: IPictogram
    categories: string
}
interface PictogramManagementProps {
    pictograms: IPictogram[]
    categories: ICategory[]
    deletePicto: CallableFunction
}

const iconStyle: TextStyle = {
    fontSize: 50
}

const fabBtnStyles: ViewStyle = {
    position: 'absolute',
    right: 10,
    bottom: 55,
}

export const PictogramManagement = ({ pictograms, categories, deletePicto }: PictogramManagementProps) => {
    const { numColumns } = useDynamicColumns()
    const navigate = useNavigate()

    const onUpdatePicto = (params: PictoParams) => {
        const inputParams: { [key: string]: any } = { ...params };
        navigate(childRoutes.createPicto, inputParams);
    }

    return (
        <View style={styles.container}>
            <FlatList
                key={numColumns}
                data={pictograms}
                keyExtractor={(picto) => `${picto.id}`}
                numColumns={numColumns}
                renderItem={({ item }) => {
                    const category = categories.find(cat => cat.id === item.categoryIds[0])
                    const params: PictoParams = {
                        picto: item,
                        categories: JSON.stringify(categories),
                    }

                    return <ListItem
                        key={item.id}
                        text={item.text}
                        subText={category?.name || ''}
                        color={category?.color}
                        imageUri={item.imageUri}
                        columns={numColumns}
                        onUpdate={() => onUpdatePicto(params)}
                        onDelete={() => deletePicto(item.id)}
                    />
                }}
            />
            <RoundedButton
                onPress={() => navigate(childRoutes.createPicto, { categories: JSON.stringify(categories) })}
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
