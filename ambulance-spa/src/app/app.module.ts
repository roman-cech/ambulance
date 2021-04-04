import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WaitingEntryComponent } from './waiting-entry/waiting-entry.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './effects/app.effects';
import { WaitingEntryEditorComponent } from './waiting-entry-editor/waiting-entry-editor.component';
import { AppRoutingModule, routes } from './app-routing.module';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { Routes, RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    PatientsListComponent,
    WaitingEntryComponent,
    WaitingEntryEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatSliderModule,
    FormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    AppRoutingModule,
    RouterModule.forRoot(routes, { enableTracing: true }),
    StoreRouterConnectingModule.forRoot()
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
