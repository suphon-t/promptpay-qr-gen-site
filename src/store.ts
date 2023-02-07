import { createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';

interface AppStore {
  promptpayId: string;
  amount: string;
}

const storageKey = 'appStore';

export function createAppStore(initialValue: AppStore) {
  const [state, setState] = createStore<AppStore>(initialValue);

  createEffect(() => {
    const { promptpayId, amount } = state;
    localStorage.setItem(storageKey, JSON.stringify({ promptpayId, amount }));
  });

  return [state, setState] as const;
}

export function getInitialValue(): AppStore {
  const storedValue = localStorage.getItem(storageKey);
  if (storedValue) {
    return JSON.parse(storedValue);
  }
  return {
    promptpayId: '',
    amount: '',
  };
}
