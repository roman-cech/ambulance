import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AmbulancePatientsListService } from './ambulance-patients-list.service';

describe('AmbulancePatientsListService', () => {
  let service: AmbulancePatientsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AmbulancePatientsListService]
    });
    service = TestBed.inject(AmbulancePatientsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
