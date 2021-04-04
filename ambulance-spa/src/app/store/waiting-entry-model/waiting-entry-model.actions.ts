import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { WaitingEntryModel } from './waiting-entry-model.model';

export const loadWaitingEntryModels = createAction(
  '[WaitingEntryModel/API] Load WaitingEntryModels',
  props<{ waitingEntryModels: WaitingEntryModel[] }>()
);

export const addWaitingEntryModel = createAction(
  '[WaitingEntryModel/API] Add WaitingEntryModel',
  props<{ waitingEntryModel: WaitingEntryModel }>()
);

export const upsertWaitingEntryModel = createAction(
  '[WaitingEntryModel/API] Upsert WaitingEntryModel',
  props<{ waitingEntryModel: WaitingEntryModel }>()
);

export const uploadWaitingEntryModel = createAction(
  '[WaitingEntryModel/API] Upload WaitingEntryModel',
  props<{ waitingEntryModel: WaitingEntryModel }>()
);

export const addWaitingEntryModels = createAction(
  '[WaitingEntryModel/API] Add WaitingEntryModels',
  props<{ waitingEntryModels: WaitingEntryModel[] }>()
);

export const upsertWaitingEntryModels = createAction(
  '[WaitingEntryModel/API] Upsert WaitingEntryModels',
  props<{ waitingEntryModels: WaitingEntryModel[] }>()
);

export const updateWaitingEntryModel = createAction(
  '[WaitingEntryModel/API] Update WaitingEntryModel',
  props<{ waitingEntryModel: Update<WaitingEntryModel> }>()
);

export const updateWaitingEntryModels = createAction(
  '[WaitingEntryModel/API] Update WaitingEntryModels',
  props<{ waitingEntryModels: Update<WaitingEntryModel>[] }>()
);

export const deleteWaitingEntryModel = createAction(
  '[WaitingEntryModel/API] Delete WaitingEntryModel',
  props<{ id: string }>()
);

export const deleteWaitingEntryModels = createAction(
  '[WaitingEntryModel/API] Delete WaitingEntryModels',
  props<{ ids: string[] }>()
);

export const clearWaitingEntryModels = createAction(
  '[WaitingEntryModel/API] Clear WaitingEntryModels'
);
