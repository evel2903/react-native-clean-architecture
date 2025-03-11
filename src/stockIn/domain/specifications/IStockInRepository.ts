import StockInEntity from "../entities/StockInEntity";
import GetStockInsPayload from "../../application/types/GetStockInsPayload";
import CreateStockInPayload from "../../application/types/CreateStockInPayload";

export const IStockInRepositoryToken = Symbol("IStockInRepository");

export interface IStockInRepository {
  getStockIns: (data: GetStockInsPayload) => Promise<{
    results: StockInEntity[];
    count: number;
  }>;
  
  getStockInById: (id: string) => Promise<StockInEntity>;
  
  createStockIn: (data: CreateStockInPayload) => Promise<StockInEntity>;
  
  updateStockInStatus: (id: string, status: StockInEntity['status']) => Promise<StockInEntity>;
}