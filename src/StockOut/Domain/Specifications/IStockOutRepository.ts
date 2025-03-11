import StockOutEntity from "../entities/StockOutEntity";
import GetStockOutsPayload from "../../application/types/GetStockOutsPayload";
import CreateStockOutPayload from "../../application/types/CreateStockOutPayload";

export const IStockOutRepositoryToken = Symbol("IStockOutRepository");

export interface IStockOutRepository {
  getStockOuts: (data: GetStockOutsPayload) => Promise<{
    results: StockOutEntity[];
    count: number;
  }>;
  
  getStockOutById: (id: string) => Promise<StockOutEntity>;
  
  createStockOut: (data: CreateStockOutPayload) => Promise<StockOutEntity>;
  
  updateStockOutStatus: (id: string, status: StockOutEntity['status']) => Promise<StockOutEntity>;
}