declare global {
  type RootState = import("../src/app/store/appStore").RootState;
  type AppDispatch = import("../src/app/store/appStore").AppDispatch;
}

export {};
