import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { RootStackScreenProps } from "../navigation/types";
import { useI18n } from "../hooks/useI18n";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFoundScreen({
  navigation,
}: RootStackScreenProps<"NotFound">) {
  const i18n = useI18n();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text variant="headlineSmall" style={{ marginBottom: 24 }}>
          {i18n.t("core.errors.screenNotFound")}
        </Text>
        <Button 
          mode="contained" 
          onPress={() => navigation.replace("Posts")}
        >
          {i18n.t("core.screens.NotFound.goHome")}
        </Button>
      </View>
    </SafeAreaView>
  );
}