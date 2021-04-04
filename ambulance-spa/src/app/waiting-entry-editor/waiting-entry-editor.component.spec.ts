import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingEntryEditorComponent } from './waiting-entry-editor.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Store } from '@ngrx/store';
import { AmbulanceState } from '../store';
import { EMPTY } from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';

const storeStub: Partial<Store<AmbulanceState>> = {
  pipe: () => EMPTY
};

describe('WaitingEntryEditorComponent', () => {
  let component: WaitingEntryEditorComponent;
  let fixture: ComponentFixture<WaitingEntryEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingEntryEditorComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: Store,
          useValue: storeStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingEntryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
