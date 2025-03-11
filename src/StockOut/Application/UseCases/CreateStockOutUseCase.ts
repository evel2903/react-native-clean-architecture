import { injectable, inject } from "inversiland";
import {
  IStockOutRepository,
  IStockOutRepositoryToken,
} from "../../domain/specifications/IStockOutRepository";
import CreateStockOutPayload from "../types/CreateStockOutPayload";
import { UseCase } from "src/Core/Application/UseCase";
import StockOutEntity from "../../domain/entities/StockOutEntity";

@injectable()
export default class CreateStockOutUseCase
  implements UseCase<CreateStockOutPayload, Promise<StockOutEntity>>
{
  constructor(
    @inject(IStockOutRepositoryToken)
    private readonly stockOutRepository: IStockOutRepository
  ) {}

  public execute(payload: CreateStockOutPayload) {
    return this.stockOutRepository.createStockOut(payload);
  }
}