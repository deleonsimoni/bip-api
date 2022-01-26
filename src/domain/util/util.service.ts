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

    public getFormatDate(date){

        let dd = new Date().toISOString();
        console.log('Data : ' + dd);

        let d = new Date("2021-10-11T03:00:00.000+00:00");
        console.log('Data 1 : ' + d);
        var dataExclusao = date;
        var arrDataExclusao = dataExclusao.split('/');

        var stringFormatada = arrDataExclusao[1] + '-' + arrDataExclusao[0] + '-' +arrDataExclusao[2];
        var dataFormatada1 = new Date(stringFormatada);
        var dataFormatada2 = new Date(arrDataExclusao[2], arrDataExclusao[1] - 1, arrDataExclusao[0]);
        console.log('Data formatada 1: ' + dataFormatada1);
        console.log('Data formatada 2: ' + dataFormatada2);

        dataFormatada1.setDate(dataFormatada1.getDate() + 60);
        dataFormatada2.setDate(dataFormatada2.getDate() + 90);

        console.log('Data formatada + 60 dias: ' + dataFormatada1);
        console.log('Data formatada + 90 dias: ' + dataFormatada2);

    }
}
