import { module } from "inversiland";
import { PostModule } from "./post/PostModule";
import { CoreModule } from "./Core/CoreModule";
import { AuthModule } from "./Auth/AuthModule";
import { InventoryModule } from "./Inventory/InventoryModule";

@module({
  imports: [CoreModule, PostModule, AuthModule, InventoryModule],
})
export default class AppModule {}