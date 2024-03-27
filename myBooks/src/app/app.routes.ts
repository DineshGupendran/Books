import { Routes } from '@angular/router';

import { BooklistComponent } from './booklist/booklist.component';

export const routes: Routes = [
    {
        path: '',
        component: BooklistComponent,
        pathMatch: 'full'
    },
];
