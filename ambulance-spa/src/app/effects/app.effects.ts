import { Injectable } from '@angular/core';
import { Actions, ROOT_EFFECTS_INIT, ofType, createEffect } from '@ngrx/effects';
import { loadWaitingEntryModels, uploadWaitingEntryModel, upsertWaitingEntryModel, deleteWaitingEntryModel } from '../store/waiting-entry-model/waiting-entry-model.actions';
import { map, mergeMap } from 'rxjs/operators';
import { AmbulancePatientsListService } from '../services/ambulance-patients-list.service';

@Injectable()
export class AppEffects {

  // we will delete this later
  private idCounter = 100;

  constructor(private actions$: Actions,
              private patientListService: AmbulancePatientsListService) {}

    init$ = createEffect(() => this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    mergeMap(_ => this.patientListService.getAllPatientsEntries()),
    map(patientListEntries => loadWaitingEntryModels({ waitingEntryModels: patientListEntries }))));

  upsert$ = createEffect(() => this.actions$.pipe(
    ofType(uploadWaitingEntryModel),
    mergeMap(payload => this.patientListService.upsertEntry(payload.waitingEntryModel)),
    map(waitingEntryModel => upsertWaitingEntryModel({ waitingEntryModel }))));

  delete$ = createEffect(() => this.actions$.pipe(
    ofType(deleteWaitingEntryModel),
    mergeMap(payload => this.patientListService.deleteEntry(payload.id))),
      { dispatch: false });
}
