export class UserElement {
    roles?:[];
    id?: number;
    nom?:string;
    prenom?:string;
    contact?:string;
    email?:string;
    type?:Type;
    societe?:string;
    image?:string;
    settings?:UserSettings

}

export enum Type{
    'Propriétaire'='Propriétaire',
    'Démarcheur' = 'Démarcheur',
    'Société immobilière'='Société immobilière'
}

export class UserSettings{
    isActive: boolean = false;
    isDeleted: boolean = false;
    registrationDate!: Date;
    joinedDate!: Date;
  }