import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { WaitingEntryModel } from './waiting-entry-model.model';
import * as WaitingEntryModelActions from './waiting-entry-model.actions';

export const waitingEntryModelsFeatureKey = 'waitingEntryModels';

export interface State extends EntityState<WaitingEntryModel> {
  // additional entities state properties
}

export const adapter: EntityAdapter<WaitingEntryModel> = createEntityAdapter<WaitingEntryModel>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(WaitingEntryModelActions.addWaitingEntryModel,
    (state, action) => adapter.addOne(action.waitingEntryModel, state)
  ),
  on(WaitingEntryModelActions.upsertWaitingEntryModel,
    (state, action) => adapter.upsertOne(action.waitingEntryModel, state)
  ),
  on(WaitingEntryModelActions.addWaitingEntryModels,
    (state, action) => adapter.addMany(action.waitingEntryModels, state)
  ),
  on(WaitingEntryModelActions.upsertWaitingEntryModels,
    (state, action) => adapter.upsertMany(action.waitingEntryModels, state)
  ),
  on(WaitingEntryModelActions.updateWaitingEntryModel,
    (state, action) => adapter.updateOne(action.waitingEntryModel, state)
  ),
  on(WaitingEntryModelActions.updateWaitingEntryModels,
    (state, action) => adapter.updateMany(action.waitingEntryModels, state)
  ),
  on(WaitingEntryModelActions.deleteWaitingEntryModel,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(WaitingEntryModelActions.deleteWaitingEntryModels,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(WaitingEntryModelActions.loadWaitingEntryModels,
    (state, action) => adapter.setAll(action.waitingEntryModels, state)
  ),
  on(WaitingEntryModelActions.clearWaitingEntryModels,
    state => adapter.removeAll(state)
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
