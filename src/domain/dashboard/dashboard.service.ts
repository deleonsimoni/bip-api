import {Get, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {ClientService} from "../client/client.service";
import {InventoryService} from "../inventory/inventory.service";

@Injectable()
export class DashboardService {
    constructor(private userService: UserService, private clientService:ClientService, private inventoryService:InventoryService) {
    }

    async clientsByMonth(userId_){
        // const result = await this.clientService.findAllByOwner(userId_);
        // result.
    }

    @Get('/totalClients')
    totalClients(userId_){
        return this.clientService.countByOwner(userId_);
    }

    totalInventory(userId_){

    }

    inventoriesByMonth(userId_){

    }

    delaysByMonth(userId_){

    }

    totalDelayedInventory(userId_){

    }
    @Get('/totalEmployee')
    totalEmployee(userId_){
        return this.userService.countByOwner(userId_)
    }

}
