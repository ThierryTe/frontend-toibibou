export class SiteModel{
    id?:any;
    nom?:string;
    adresse?: string;
    email?:string;
    telephone?:string;
    fax?:string;
    accessibilite: Accessibilte | any;
    etage?:number;


}

export enum Accessibilte{
    'Ascenseur' = 'Ascenseur',
    'Accès handicapé' = 'Accès handicapé'
}