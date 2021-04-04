import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppEffects } from './app.effects';

describe('AppEffects', () => {
  // tslint:disable-next-line: prefer-const
  let actions$: Observable<any>;
  let effects: AppEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppEffects,
        provideMockActions(() => actions$)
      ],
      imports: [
        HttpClientTestingModule
      ]
    });

    effects = TestBed.inject(AppEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
