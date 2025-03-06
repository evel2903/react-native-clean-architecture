import { getModuleContainer, module } from "inversiland";
import { AuthStore } from "./presentation/stores/AuthStore/AuthStore";
import { IAuthRepositoryToken } from "./domain/specifications/IAuthRepository";
import AuthRepository from "./infrastructure/implementations/AuthRepository";
import LoginUseCase from "./application/useCases/LoginUseCase";
import LogoutUseCase from "./application/useCases/LogoutUseCase";

@module({
  providers: [
    {
      provide: IAuthRepositoryToken,
      useClass: AuthRepository,
    },
    LoginUseCase,
    LogoutUseCase,
    {
      useClass: AuthStore,
      scope: "Transient",
    },
  ],
})
export class AuthModule {}

export const authModuleContainer = getModuleContainer(AuthModule);