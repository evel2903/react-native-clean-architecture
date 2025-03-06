import { useContextStore } from "src/core/presentation/hooks/useContextStore";
import { AuthStore } from "./AuthStore";
import { AuthStoreContext } from "./AuthStoreContext";

export const useAuthStore = (): AuthStore => {
  const store = useContextStore(AuthStoreContext);

  return store;
};