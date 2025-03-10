import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import PostScreen from "src/post/presentation/screens/PostScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import PostsScreen from "src/post/presentation/screens/PostsScreen";
import AuthScreen from "src/auth/presentation/screens/AuthScreen";
import HomeScreen from "../screens/HomeScreen";
import { useTheme } from "../theme/ThemeProvider";
import { observer } from 'mobx-react';
import { useAuthStore } from "src/auth/presentation/stores/AuthStore/useAuthStore";
import { withProviders } from "../utils/withProviders";
import { AuthStoreProvider } from "src/auth/presentation/stores/AuthStore/AuthStoreProvider";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = observer(() => {
  const { theme } = useTheme();
  const authStore = useAuthStore();
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.background,
        }
      }}
    >
      {/* Include all screens in the navigator, but configure initial route */}
      <Stack.Screen 
        name="Auth" 
        component={AuthScreen} 
        options={{ 
          // Prevent going back to Auth screen after login
          gestureEnabled: false,
          // Hide back button if shown
          headerLeft: () => null 
        }}
      />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Posts" component={PostsScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} />
    </Stack.Navigator>
  );
});

export default withProviders(AuthStoreProvider)(RootNavigator);