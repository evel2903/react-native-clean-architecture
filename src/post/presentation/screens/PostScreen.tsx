import { useEffect } from "react";
import { View } from "react-native";
import { ActivityIndicator, Card, Text } from "react-native-paper";

import { RootStackScreenProps } from "src/core/presentation/navigation/types";
import { useI18n } from "src/core/presentation/hooks/useI18n";
import { withProviders } from "src/core/presentation/utils/withProviders";
import { FindPostStoreProvider } from "../stores/FindPostStore/FindPostStoreProvider";
import { useFindPostStore } from "../stores/FindPostStore/useFindPostStore";
import { observer } from "mobx-react";
import { SafeAreaView } from "react-native-safe-area-context";

const PostScreen = observer(({ route }: RootStackScreenProps<"Post">) => {
  const { id } = route.params;
  const i18n = useI18n();
  const findPostStore = useFindPostStore();
  const { post, isLoading } = findPostStore;

  useEffect(() => {
    findPostStore.findPost(id);
  }, [findPostStore, id]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16, flex: 1 }}>
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
            <Text style={{ marginTop: 16 }}>{i18n.t("post.screens.Post.loading")}</Text>
          </View>
        ) : (
          <Card style={{ flex: 1 }}>
            <Card.Title title={post?.title} />
            <Card.Content>
              <Text variant="bodyLarge">{post?.body}</Text>
            </Card.Content>
          </Card>
        )}
      </View>
    </SafeAreaView>
  );
});

export default withProviders(FindPostStoreProvider)(PostScreen);