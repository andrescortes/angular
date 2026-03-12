import { computed } from "@angular/core";
import { signalStoreFeature, withComputed, withState } from "@ngrx/signals";

export type RequestStatusType =
  | 'idle'
  | 'pending'
  | 'fulfilled'
  | { error: string };

export type RequestStatusState = {
  requestStatus: RequestStatusType;
};

export function withRequestStatus() {
  return signalStoreFeature(
    withState<RequestStatusState>({ requestStatus: 'idle' }),
    withComputed(({ requestStatus }) => ({
      isPending: computed(() => requestStatus() === 'pending'),
      isFulfilled: computed(() => requestStatus() === 'fulfilled'),
      isError: computed(() => {
        const status = requestStatus();
        return typeof status === 'object' ? status.error : null;
      }),
    }))
  )
}


export function setPending(): RequestStatusState {
  return { requestStatus: 'pending' };
}

export function setFulfilled(): RequestStatusState {
  return { requestStatus: 'fulfilled' };
}

export function setError(error: string): RequestStatusState {
  return { requestStatus: { error } };
}
