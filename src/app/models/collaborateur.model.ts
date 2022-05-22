import { PaysModel } from "./pays.model";
import { SiteModel } from "./site.model";

export class CollaborateurModel{
    id?:any;
    nom?:string;
    prenom?:string;
    dateNaissance?:Date;
    sexe?:Sexe;
    specialite:Specialite | any;
    pays: PaysModel | any;
    ville?: string;
    adresse?:string;
    password?: string;
    confirmation?:string;
    site: SiteModel[] | any;
    image?:string;
}

export enum Sexe{
    'Masculin'= 'Masculin',
    'Féminin' = 'Féminin'
}
export enum Specialite{
    'Pédiatre'='Pédiatre',
    'Acceuil' = 'Accueil',
    'Facturation' = 'Facturation',
    'Aide-soignat' = 'Aide-soignat'

}