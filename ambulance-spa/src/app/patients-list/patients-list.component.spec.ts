import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientsListComponent } from './patients-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, Input } from '@angular/core';
import { WaitingEntryModel } from '../store/waiting-entry-model/waiting-entry-model.model';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Store } from '@ngrx/store';
import { AmbulanceState } from '../store';
import { EMPTY } from 'rxjs';

const storeStub: Partial<Store<AmbulanceState>> = {
    pipe: () => EMPTY
  };

@Component({selector: 'app-waiting-entry', template: ''})
class WaitingEntryStubComponent {
  @Input()
  data: WaitingEntryModel[] = [];
 }

describe('PatientsListComponent', () => {
let component: PatientsListComponent;
let fixture: ComponentFixture<PatientsListComponent>;

beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [
        MatExpansionModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        MatFormFieldModule,
        RouterTestingModule
    ],
    providers: [ {provide: Store, useValue: storeStub}] ,
    declarations: [ PatientsListComponent, WaitingEntryStubComponent ]
    })
    .compileComponents();
}));

beforeEach(() => {
    fixture = TestBed.createComponent(PatientsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
});

it('should create', () => {
    expect(component).toBeTruthy();
});
});
