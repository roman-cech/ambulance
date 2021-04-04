import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WaitingEntryComponent } from './waiting-entry.component';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('WaitingEntryComponent', () => {
  let component: WaitingEntryComponent;
  let fixture: ComponentFixture<WaitingEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatExpansionModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      declarations: [ WaitingEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingEntryComponent);
    component = fixture.componentInstance;
    component.data = {
      id: '1',
      patientId: '78987',
      name: 'Test Kralovic',
      since: new Date(2018, 12, 25, 10, 32),
      estimated: new Date(2018, 12, 25, 11, 15),
      estimatedDurationMinutes: 13,
      condition: {
        value: 'Testovanie',
        code: 'testing',
        reference: null,
        typicalDurationMinutes: 10
      }
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
