import { getModuleContainer, module } from "inversiland";
import { AuthStore } from "./presentation/stores/AuthStore/AuthStore";

@module({
  providers: [
    {
      useClass: AuthStore,
      scope: "Transient",
    },
  ],
})
export class AuthModule {}

export const authModuleContainer = getModuleContainer(AuthModule);