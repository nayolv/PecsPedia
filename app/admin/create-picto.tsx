import { ScrollView } from "react-native";
import { PictoForm } from "../src/modules/AdminModule/components/Forms/PictoForm";

export default function CreatePictogramScreen() {
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#F7F4EB' }}>
            <PictoForm />
        </ScrollView>
    );
}