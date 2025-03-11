import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./Types/Index";
import PostScreen from "src/post/presentation/screens/PostScreen";
import NotFoundScreen from "../Screens/NotFoundScreen";
import PostsScreen from "src/post/presentation/screens/PostsScreen";
import AuthScreen from "@/src/Auth/Presentation/Screens/AuthScreen";
import HomeScreen from "../Screens/HomeScreen";
import InventoryScreen from "@/src/Inventory/Presentation/Screens/InventoryScreen";
import StockInScreen from "src/stockIn/presentation/screens/StockInScreen";
import { useTheme } from "../Theme/ThemeProvider";
import { observer } from 'mobx-react';
import { withProviders } from "../Utils/WithProviders";
import { AuthStoreProvider } from "@/src/Auth/Presentation/Stores/AuthStore/AuthStoreProvider";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = observer(() => {
  const { theme } = useTheme();
  
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
      <Stack.Screen name="Inventory" component={InventoryScreen} />
      <Stack.Screen name="StockIn" component={StockInScreen} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} />
    </Stack.Navigator>
  );
});

export default withProviders(AuthStoreProvider)(RootNavigator);