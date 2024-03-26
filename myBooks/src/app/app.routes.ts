import { Routes } from '@angular/router';

import { BooklistComponent } from './booklist/booklist.component';

export const routes: Routes = [
    // { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    // BooklistComponent
    {
        path: '',
        component: BooklistComponent,
        pathMatch: 'full',
        // canActivate: [AuthService],
        // data: { permissions: ['Admin', 'Owner', 'Accountant', 'SalesManager', 'PurchaseManager', 'AccountsManager', 'ProductsManager', 'HRManager'] }
    },
];
