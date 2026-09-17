import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload';
import { revalidatePath } from 'next/cache';

/**
 * The whole site is a single statically rendered page at "/".
 * Any content change re-renders it on demand.
 */
function revalidateHome() {
  try {
    revalidatePath('/');
  } catch {
    // Not running inside a Next.js request (e.g. CLI seed / migrate). Nothing to do.
  }
}

export const revalidateHomeAfterChange: CollectionAfterChangeHook = ({ doc, req: { context } }) => {
  if (!context?.disableRevalidate) revalidateHome();
  return doc;
};

export const revalidateHomeAfterDelete: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (!context?.disableRevalidate) revalidateHome();
  return doc;
};

export const revalidateHomeAfterGlobalChange: GlobalAfterChangeHook = ({ doc, req: { context } }) => {
  if (!context?.disableRevalidate) revalidateHome();
  return doc;
};
