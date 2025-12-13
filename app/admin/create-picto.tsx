import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { PictoForm } from "../src/modules/AdminModule/components/Forms/PictoForm";
import { HeaderAdmin } from "../src/modules/AdminModule/components/HeaderAdmin/HeaderAdmin";

export default function CreatePictogramScreen() {
    const params = useLocalSearchParams();
    const { picto } = params || {};
    const pictoToEdit = picto ? JSON.parse(picto as string) : null;
    const title = pictoToEdit?.id ? 'Editar Pictograma' : 'Crear Nuevo Pictograma';

    return (
        <>
            <Stack.Screen options={{
                header: () => <HeaderAdmin title={title} />
            }} />
            <ScrollView style={{ flex: 1, backgroundColor: '#F7F4EB' }}>
                <PictoForm />
            </ScrollView>
        </>
    );
}