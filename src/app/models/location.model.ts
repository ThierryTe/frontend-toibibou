export class Location{
    id?:number;
    ville?:string;
    quartier?: string;
    localisation?:string;
    titre?:string;
    description?:string;
    prix?: string;
    condition?:string;
    images?: [];
    statut?: Statut;
}

export enum Statut{
    'Disponoible' = 'Disponible',
    'Occupée' = 'Occupée'
}