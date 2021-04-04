import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

import { Store } from '@ngrx/store';
import { AmbulanceState } from './store';
import { EMPTY } from 'rxjs';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';


const storeStub: Partial<Store<AmbulanceState>> = {
  pipe: () => EMPTY
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        MatIconModule,
        MatToolbarModule,
        MatExpansionModule,
        MatFormFieldModule,
        RouterTestingModule
      ],
      providers: [ {provide: Store, useValue: storeStub}] ,
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ambulance-spa'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ambulance-spa');
  });
});
