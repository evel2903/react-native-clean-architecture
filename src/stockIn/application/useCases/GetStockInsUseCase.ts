import { injectable, inject } from "inversiland";
import {
  IStockInRepository,
  IStockInRepositoryToken,
} from "../../domain/specifications/IStockInRepository";
import GetStockInsPayload from "../types/GetStockInsPayload";
import { UseCase } from "src/Core/Application/UseCase";
import StockInEntity from "../../domain/entities/StockInEntity";

@injectable()
export default class GetStockInsUseCase
  implements UseCase<GetStockInsPayload, Promise<{ results: StockInEntity[]; count: number }>>
{
  constructor(
    @inject(IStockInRepositoryToken)
    private readonly stockInRepository: IStockInRepository
  ) {}

  public execute(payload: GetStockInsPayload) {
    return this.stockInRepository.getStockIns(payload);
  }
}