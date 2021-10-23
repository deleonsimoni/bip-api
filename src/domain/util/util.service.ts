import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {


    public getActualDate(){

        let d = new Date();
        var iso = d.getFullYear().toString() + "-";
        iso += (d.getMonth() + 1).toString().padStart(2, '0') + "-";
        iso += d.getDate().toString().padStart(2, '0') + "T";
        iso += d.getHours().toString().padStart(2, '0') + ":";
        iso += d.getMinutes().toString().padStart(2, '0') + ":";
        iso += d.getSeconds().toString().padStart(2, '0');
        return new Date(d.getFullYear(), Number((d.getMonth()).toString().padStart(2, '0')), Number(d.getDate().toString().padStart(2, '0')));
         
    }
}
