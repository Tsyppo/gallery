import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { paintingAPI } from '../services/PaintingService';
import { authorsAPI } from '../services/AuthorsService';
import { locationsAPI } from '../services/LocationsService';

const rootReducer = combineReducers({
  [paintingAPI.reducerPath]: paintingAPI.reducer,
  [authorsAPI.reducerPath]: authorsAPI.reducer,
  [locationsAPI.reducerPath]: locationsAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(paintingAPI.middleware)
        .concat(authorsAPI.middleware)
        .concat(locationsAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
