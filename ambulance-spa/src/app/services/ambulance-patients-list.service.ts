import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WaitingEntryModel } from '../store/waiting-entry-model/waiting-entry-model.model';
import { delay, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AmbulancePatientsListService {

  public constructor(private httpClient: HttpClient) { }

  // tslint:disable-next-line: typedef
  private get baseUrl() {
    const baseUrl = environment.apiBaseUrl || '/api';
    const ambulance = environment.ambulanceId || 'ambulance';
    return `${baseUrl}/waiting-list/${ambulance}`;
  }

  /** retrieves list of all patients currently waiting at ambulance
   *
   * @param ambulanceId - identification of the ambulance
   * @returns observable with one item of the list
   */
  public getAllPatientsEntries(): Observable<WaitingEntryModel[]>
  {
    return this.httpClient
      .get(this.baseUrl)
      .pipe(map(response => (response as any).waitingList as Array<WaitingEntryModel>));
  }

  /** updates or inserts new entry in the patients list
   *
   * @param entry - new or updates entry
   *
   * @returns observable of the entry after it is updated at the server
   */
  public upsertEntry(entry: WaitingEntryModel): Observable<WaitingEntryModel> {
    entry = Object.assign({}, entry); // create clone to avoid mutation of input

    let url = `${this.baseUrl}/entry`;
    if (entry.id) {
      url = `${url}/${entry.id}`;
    } else {
      entry.id = 'new-entry'; // entry.id is Required
    }

    return this.httpClient
      .post(url, entry)
      .pipe(map(response => response as WaitingEntryModel));
  }

  /** removes an entry from the patients list
   *
   * @param entryId - id of entry to delete
   *
   * @returns observable referring to existence of item in
   *          the list before its removal
   */
  public deleteEntry(entryId: string): Observable<boolean> {
    return this.httpClient
      .delete(`${this.baseUrl}/entry/${entryId}`)
      .pipe(
        map(_ => true),
        catchError(err => {
          if (err.error instanceof Error) {
            console.error(`Error deleting entry ${entryId}: ${err.error.message}`);
          } else {
            console.error(`Error deleting entry ${entryId}: ${err.status}: ${err.error}`);
          }
          return of(false);
        }));
  }

  /** list of predefined ambulance visits reasons
   * and associated typical visit times
   *
   * @param ambulanceId - identification of the ambulance
   *
   * @returns observable of predefined reasons
   */
  public getWaitingReasons(): Observable<Array<{
    value: string,
    code: string,
    typicalDurationMinutes: number,
    reference: string
  }>> {
    return this.httpClient
      .get(this.baseUrl)
      .pipe(map(response => (response as any).predefinedConditions as Array<{
        value: string,
        code: string,
        typicalDurationMinutes: number,
        reference: string
      }>));
  }

}
