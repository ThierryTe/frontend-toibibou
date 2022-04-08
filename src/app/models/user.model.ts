export class UserElement {
    id?: number;
    nom?:string;
    prenom?:string;
    contact!:string;
    email?:string;
    type?:Type;
    societe?:string;
    image?:string;
    username?:string;
    password?:string;
    roles?:[];
    confirmPassword?:string;

}

export enum Type{
    'Propriétaire'='Propriétaire',
    'Démarcheur' = 'Démarcheur',
    'Société immobilière'='Société immobilière',
    'Locateur de véhicule' = 'Locateur de véhicule',
    'Service de location de véhicule'= 'Service de location de véhicule'
}

export class UserSettings{
    isActive: boolean = false;
    isDeleted: boolean = false;
    registrationDate!: Date;
    joinedDate!: Date;
  }
/* export class TokenJwt {
    access_token : string;
    constructor(token: string) {
        this.access_token=token;
    }
} */
export class TokenJwt {
    access_token : string;
    constructor(token: string) {
        this.access_token=token;
    }
}