import { Component, OnInit } from '@angular/core';
import { WaitingEntryModel } from '../store/waiting-entry-model/waiting-entry-model.model';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AmbulanceState, selectPatientsList } from '../store';
import { map, switchMap } from 'rxjs/operators';
import * as fromWaitingEntryModel from '../store/waiting-entry-model/waiting-entry-model.reducer';
import { upsertWaitingEntryModel, uploadWaitingEntryModel } from '../store/waiting-entry-model/waiting-entry-model.actions';
import { AmbulancePatientsListService } from '../services/ambulance-patients-list.service';

@Component({
  selector: 'app-waiting-entry-editor',
  templateUrl: './waiting-entry-editor.component.html',
  styleUrls: ['./waiting-entry-editor.component.css']
})
export class WaitingEntryEditorComponent implements OnInit {

  public data$: Observable<WaitingEntryModel>;
  public readonly knownConditions$: Observable<Array<{
    value: string,
    code: string,
    typicalDurationMinutes: number,
    reference: string
  }>>;
  private newEntryPlaceholder: WaitingEntryModel = {
    id: undefined,
    name: '',
    patientId: '',
    since: new Date(Date.now()),
    estimated: undefined,
    estimatedDurationMinutes: 20,
    condition: null
    };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store<AmbulanceState>,
    private readonly router: Router,
    api: AmbulancePatientsListService ) {
      this.knownConditions$ = api.getWaitingReasons();
     }

// tslint:disable-next-line: typedef
public ngOnInit() {
    this.data$ = this.route.paramMap.pipe(
    map(_ => _.get('id')),
    switchMap(
        id => (id === 'new')
        ? of(this.newEntryPlaceholder)
        : this.store.pipe(
        select(selectPatientsList),
        select(fromWaitingEntryModel.adapter.getSelectors().selectEntities),
        select(entities => Object.assign({}, entities[id])))));
    }


// tslint:disable-next-line: typedef
public onUpsertEntry(waitingEntryModel: WaitingEntryModel) {
  this.store.dispatch(
      uploadWaitingEntryModel( { waitingEntryModel } ));
  this.router.navigate(['/', 'patients-list']);
  }

public compareConditionsFn(firstCondition, secondCondition): boolean {
  return firstCondition.code === secondCondition.code;
}
}
