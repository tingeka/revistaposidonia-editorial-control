import type { StateCreator } from 'zustand';

type SliceMap = Record<string, StateCreator<any, any, any, any>>;

/**
 * Combine a base store with slices.
 *
 * The resulting store is Base & { [K in keyof Slices]: ReturnType<Slices[K]> }.
 */
export function combineSlices<Base, S extends SliceMap>(
  base: StateCreator<Base>,
  slices: S
): StateCreator<Base & { [K in keyof S]: ReturnType<S[K]> }> {
  return (set, get, store) => {
    // base store state
    const baseState = base(set, get, store) as Base;

    // slices state
    const sliceEntries = Object.entries(slices).map(([key, sliceFn]) => [
      key,
      sliceFn(set, get, store),
    ] as const);

    const mergedSlices = Object.fromEntries(sliceEntries) as {
      [K in keyof S]: ReturnType<S[K]>;
    };

    return {
      ...baseState,
      ...mergedSlices,
    };
  };
}
