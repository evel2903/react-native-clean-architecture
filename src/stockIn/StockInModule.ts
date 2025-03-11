import { getModuleContainer, module } from "inversiland";
import { StockInStore } from "./presentation/stores/StockInStore/StockInStore";
import { IStockInRepositoryToken } from "./domain/specifications/IStockInRepository";
import StockInRepository from "./infrastructure/implementations/StockInRepository";
import GetStockInsUseCase from "./application/useCases/GetStockInsUseCase";
import CreateStockInUseCase from "./application/useCases/CreateStockInUseCase";

@module({
  providers: [
    {
      provide: IStockInRepositoryToken,
      useClass: StockInRepository,
    },
    GetStockInsUseCase,
    CreateStockInUseCase,
    {
      useClass: StockInStore,
      scope: "Transient",
    },
  ],
})
export class StockInModule {}

export const stockInModuleContainer = getModuleContainer(StockInModule);