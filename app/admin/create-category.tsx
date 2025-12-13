import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { CategoryForm } from "../src/modules/AdminModule/components/Forms/CategoryForm";
import { HeaderAdmin } from "../src/modules/AdminModule/components/HeaderAdmin/HeaderAdmin";

export default function CreateCategoryScreen() {
    const params = useLocalSearchParams();
    const { picto } = params || {};
    const pictoToEdit = picto ? JSON.parse(picto as string) : null;
    const title = pictoToEdit?.id ? 'Editar Categoría' : 'Crear Nueva Categoría';

    return (
        <>
            <Stack.Screen options={{
                header: () => <HeaderAdmin title={title} />
            }} />
            <ScrollView style={{ flex: 1, backgroundColor: '#F7F4EB' }}>
                <CategoryForm />
            </ScrollView>
        </>

    );
}