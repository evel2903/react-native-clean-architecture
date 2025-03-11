import { PropsWithChildren } from "react";
import { StockOutStoreContext } from "./StockOutStoreContext";
import { StockOutStore } from "./StockOutStore";
import { stockOutModuleContainer } from "src/stockOut/StockOutModule";

export const StockOutStoreProvider = ({ children }: PropsWithChildren) => {
  return (
    <StockOutStoreContext.Provider
      value={stockOutModuleContainer.get(StockOutStore)}
    >
      {children}
    </StockOutStoreContext.Provider>
  );
};