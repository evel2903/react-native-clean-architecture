import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import PostScreen from "src/post/presentation/screens/PostScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import PostsScreen from "src/post/presentation/screens/PostsScreen";
import AuthScreen from "src/auth/presentation/screens/AuthScreen";
import HomeScreen from "../screens/HomeScreen";
import { useTheme } from "../theme/ThemeProvider";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const initialRouteName: keyof RootStackParamList = "Auth";
  const { theme } = useTheme();

  return (
    <Stack.Navigator 
        initialRouteName={initialRouteName}
        screenOptions={{
        headerShown: false,
        contentStyle: {
            backgroundColor: theme.colors.background,
        }
        }}
    >
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Posts" component={PostsScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} />
    </Stack.Navigator>
  );
}