"use client";

import { useEffect, useRef } from "react";
import type { ActionState } from "@/app/projects/actions";

/**
 * Runs `onSuccess` exactly once per successful form submission.
 *
 * `useActionState` returns a fresh state object for every submission, so the
 * object identity — rather than the message text — is what marks a result as
 * already handled. Keeping the callback in a ref means an unstable parent
 * callback can't retrigger the effect (which would loop `router.refresh()`).
 */
export const useActionSuccess = (state: ActionState, onSuccess: () => void) => {
  const handled = useRef<ActionState | null>(null);
  const callback = useRef(onSuccess);

  useEffect(() => {
    callback.current = onSuccess;
  });

  useEffect(() => {
    if (state.success && handled.current !== state) {
      handled.current = state;
      callback.current();
    }
  }, [state]);
};
