import { getState, signalStoreFeature, withHooks } from "@ngrx/signals";

export function withLogger(name: string) {
  return signalStoreFeature(
    withHooks({
      onInit(store) {
        const state = getState(store);
        console.log(`Store initialized with state: ${name}`, state);
      },
    })
  )
}
