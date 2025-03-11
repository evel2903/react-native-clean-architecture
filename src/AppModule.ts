import { module } from "inversiland";
import { PostModule } from "./post/PostModule";
import { CoreModule } from "./Core/CoreModule";
import { AuthModule } from "./Auth/AuthModule";
import { InventoryModule } from "./Inventory/InventoryModule";
import { StockInModule } from "./stockIn/StockInModule";

@module({
    imports: [CoreModule, PostModule, AuthModule, InventoryModule, StockInModule],
})
export default class AppModule { }