import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromWaitingEntryModel from './waiting-entry-model/waiting-entry-model.reducer';
import {  routerReducer, RouterReducerState, SerializedRouterStateSnapshot } from '@ngrx/router-store';


export interface AmbulanceState {
  router: RouterReducerState<SerializedRouterStateSnapshot>;
  waitingEntryModel: fromWaitingEntryModel.State;
}

export const reducers: ActionReducerMap<AmbulanceState> = {
  router: routerReducer,
  waitingEntryModel: fromWaitingEntryModel.reducer,
};

export const metaReducers: MetaReducer<AmbulanceState>[] = !environment.production ? [] : [];

export const selectPatientsList = (state: AmbulanceState) => state.waitingEntryModel;
