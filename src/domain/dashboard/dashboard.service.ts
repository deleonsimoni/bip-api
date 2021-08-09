import {Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {ClientService} from "../client/client.service";
import {InventoryService} from "../inventory/inventory.service";

@Injectable()
export class DashboardService {
    constructor(private userService: UserService, private clientService:ClientService, private inventoryService:InventoryService) {




    }
}
