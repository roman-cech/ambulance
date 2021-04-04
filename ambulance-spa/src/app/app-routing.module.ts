import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { WaitingEntryEditorComponent } from './waiting-entry-editor/waiting-entry-editor.component';

export const routes: Routes = [
    { path: 'patients-list', component: PatientsListComponent },
    { path: 'patients-list/:id', component: WaitingEntryEditorComponent },
    {
        path: '',
        redirectTo: '/patients-list',
        pathMatch: 'full'
    }
];

@NgModule({
 declarations: [],
})
export class AppRoutingModule { }
