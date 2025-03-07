import { useEffect } from "react";
import { FlatList, View } from "react-native";
import { ActivityIndicator, Appbar, Text } from "react-native-paper";

import { useI18n } from "src/core/presentation/hooks/useI18n";
import PostItem from "../components/PostItem";
import { observer } from "mobx-react";
import { useGetPostsStore } from "../stores/GetPostsStore/useGetPostsStore";
import { withProviders } from "src/core/presentation/utils/withProviders";
import { GetPostsStoreProvider } from "../stores/GetPostsStore/GetPostsStoreProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "src/core/presentation/theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { RootScreenNavigationProp } from "src/core/presentation/navigation/types";

const PostsScreen = observer(() => {
  const i18n = useI18n();
  const navigation = useNavigation<RootScreenNavigationProp<'Posts'>>();
  const getPostsStore = useGetPostsStore();
  const { isLoading, results } = getPostsStore;
  const theme = useTheme();

  useEffect(() => {
    getPostsStore.getPosts();
  }, [getPostsStore]);

  const handleGoBack = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.theme.colors.background }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={handleGoBack} />
        <Appbar.Content title="Posts" />
      </Appbar.Header>
      
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
            <Text style={{ marginTop: 16 }}>{i18n.t("post.screens.Posts.loading")}</Text>
          </View>
        ) : (
          <FlatList
            data={results}
            renderItem={({ item }) => <PostItem post={item} />}
            contentContainerStyle={{ padding: 8 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
});

export default withProviders(GetPostsStoreProvider)(PostsScreen);