import { Component, OnInit } from '@angular/core';
import { WaitingEntryModel } from '../store/waiting-entry-model/waiting-entry-model.model';
import { Observable, of } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { AmbulanceState, selectPatientsList } from '../store';
import * as fromWaitingEntry from '../store/waiting-entry-model/waiting-entry-model.reducer';

import { deleteWaitingEntryModel } from '../store/waiting-entry-model/waiting-entry-model.actions';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {
  public readonly patients: Observable<WaitingEntryModel[]>;

  constructor( private store: Store<AmbulanceState>) {
    this.patients = store.pipe(
      select(selectPatientsList),
      select(fromWaitingEntry.adapter.getSelectors().selectAll));
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  public onDelete(entry: WaitingEntryModel) {
    this.store.dispatch(deleteWaitingEntryModel({ id: entry.id }));
  }
}
