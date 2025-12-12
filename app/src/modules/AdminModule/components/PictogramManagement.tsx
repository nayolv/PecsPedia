import { RoundedButton } from '@/app/src/components/Buttons/RoundedButton/RoundedButton'
import { PictogramList } from '@/app/src/components/Lists/PictogramList/PictogramList'
import { useDynamicColumns } from '@/app/src/hooks/useDynamicColumns'
import { useNavigate } from '@/app/src/hooks/useNavigate'
import { childRoutes } from '@/app/src/router/routes'
import { StyleSheet, View } from 'react-native'
import { PictogramManagementProps, PictoParams } from '../models/managementModels'
import { fabBtnStyles, iconStyle } from '../utils/stylesUtils'
import { ListItem } from './Lists/ListItem'

export const PictogramManagement = ({ pictograms, categories, onDelete }: PictogramManagementProps) => {
    const navigate = useNavigate()
    const { numColumns } = useDynamicColumns()

    const onUpdatePicto = (params: PictoParams) => {
        const inputParams: { [key: string]: any } = { ...params };
        navigate(childRoutes.createPicto, inputParams);
    }

    return (
        <View style={styles.container}>
            <PictogramList
                pictograms={pictograms}
                categories={categories}
                renderItem={({ item }) => {
                    const category = categories.find(cat => cat.id === item.categoryIds[0])
                    const params: PictoParams = {
                        picto: JSON.stringify(item),
                        categories: JSON.stringify(categories),
                        pictograms: JSON.stringify(pictograms),
                    }

                    return <ListItem
                        key={item.id}
                        text={item.text}
                        subText={category?.name || ''}
                        color={category?.color}
                        imageUri={item.imageUri}
                        columns={numColumns}
                        onUpdate={() => onUpdatePicto(params)}
                        onDelete={() => onDelete(item.id)}
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