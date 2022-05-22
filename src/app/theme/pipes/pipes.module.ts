import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterByIdPipe } from './filter-by-id.pipe'; 
import { ProfilePicturePipe } from './profilePicture.pipe';
import { UserSearchPipe } from './user-search.pipe';
import { collaborateurSearchPipe } from './collaborateur-search.pipe';
import { SiteSearchPipe } from './site-search.pipe';

@NgModule({
    imports: [ 
        CommonModule 
    ],
    declarations: [
        FilterByIdPipe,
        ProfilePicturePipe,
        UserSearchPipe,
        collaborateurSearchPipe,
        SiteSearchPipe
    ],
    exports: [
        FilterByIdPipe,
        ProfilePicturePipe,
        UserSearchPipe,
        collaborateurSearchPipe,
        SiteSearchPipe
    ]
})
export class PipesModule { }
