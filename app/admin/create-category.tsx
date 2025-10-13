import { ScrollView } from "react-native";
import { CategoryForm } from "../src/modules/AdminModule/components/Forms/CategoryForm";

export default function CreateCategoryScreen() {
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#F7F4EB' }}>
            <CategoryForm />
        </ScrollView>
    );
}