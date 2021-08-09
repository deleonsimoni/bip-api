import {Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {ClientService} from "../client/client.service";
import {InventoryService} from "../inventory/inventory.service";

@Injectable()
export class DashboardService {
    constructor(private userService: UserService, private clientService:ClientService, private inventoryService:InventoryService) {
    }

    async clientsByMonth(userId_){
        // const returno: [] = this.userService.findAll();
    }

    totalClients(userId_){

    }

    totalInventory(userId_){

    }

    inventoriesByMonth(userId_){

    }

    delaysByMonth(userId_){

    }

    totalDelayedInventory(userId_){

    }

    totalEmployee(userId_){

    }

}
