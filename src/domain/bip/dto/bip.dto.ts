export class BipDTO {
    idInventario: string;
    idSecao: string;
    bip: [{
        id: number,
        idInventario: string,
        idSecao: string,
        bip: string,
        device: string,
        isFounded: boolean
    }];
}

