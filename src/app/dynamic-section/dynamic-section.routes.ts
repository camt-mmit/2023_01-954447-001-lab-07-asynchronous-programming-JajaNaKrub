import { Routes } from '@angular/router';
import { DynamicSectionFormPageComponent } from './pages/dynamic-section-form-page/dynamic-section-form-page.component';
import { DynamicSectionDisplayPageComponent } from './pages/dynamic-section-display-page/dynamic-section-display-page.component';
import { DynamicSectionPageComponent } from './pages/dynamic-section-page/dynamic-section-page.component';
import { DynamicInputDisplayPageComponent } from './pages/dynamic-input-display-page/dynamic-input-display-page.component';

export const routes: Routes = [
  {
    path: '',
    component: DynamicSectionPageComponent,
    children: [
      { path: '', redirectTo: 'form', pathMatch: 'full' },
      {
        path: 'display',
        component: DynamicSectionDisplayPageComponent,
      },
      { path: 'form', component: DynamicSectionFormPageComponent },
      {
        path: 'display',
        component: DynamicSectionDisplayPageComponent,
        children: [
          {
            path: ':index',
            component: DynamicInputDisplayPageComponent,
          },
        ],
      },
    ],
  },
];
