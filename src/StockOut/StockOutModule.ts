import { getModuleContainer, module } from "inversiland";
import { StockOutStore } from "./presentation/stores/StockOutStore/StockOutStore";
import { IStockOutRepositoryToken } from "./domain/specifications/IStockOutRepository";
import StockOutRepository from "./infrastructure/implementations/StockOutRepository";
import GetStockOutsUseCase from "./application/useCases/GetStockOutsUseCase";
import CreateStockOutUseCase from "./application/useCases/CreateStockOutUseCase";

@module({
  providers: [
    {
      provide: IStockOutRepositoryToken,
      useClass: StockOutRepository,
    },
    GetStockOutsUseCase,
    CreateStockOutUseCase,
    {
      useClass: StockOutStore,
      scope: "Transient",
    },
  ],
})
export class StockOutModule {}

export const stockOutModuleContainer = getModuleContainer(StockOutModule);