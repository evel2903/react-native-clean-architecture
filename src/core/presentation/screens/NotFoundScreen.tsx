import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { RootStackScreenProps } from "../navigation/types";
import { useI18n } from "../hooks/useI18n";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../theme/ThemeProvider";

export default function NotFoundScreen({
  navigation,
}: RootStackScreenProps<"NotFound">) {
  const i18n = useI18n();
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.theme.colors.background }}>
      <StatusBar style={theme.isDarkTheme ? 'light' : 'dark'} />
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'right', 'left', 'bottom']}>
        <View style={{ padding: 16, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Text variant="headlineSmall" style={{ marginBottom: 24 }}>
            {i18n.t("core.errors.screenNotFound")}
          </Text>
          <Button 
            mode="contained" 
            onPress={() => navigation.replace("Home")}
          >
            {i18n.t("core.screens.NotFound.goHome")}
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}