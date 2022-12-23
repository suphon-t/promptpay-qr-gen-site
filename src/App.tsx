import { Component, createMemo } from 'solid-js';
import { createAppStore } from './store';
import { generate } from 'promptparse/dist/generators/promptpay/AnyID';
import { QRCode } from './QRCode';
import { Input } from './Input';

function parseAmount(amountString: string) {
  if (amountString === '') return undefined;
  const amount = Number(amountString);
  if (!isFinite(amount)) throw new Error('Invalid amount');
  return amount;
}

const App: Component = () => {
  const [state, setState] = createAppStore();

  const qr = createMemo(() => {
    try {
      const amount = parseAmount(state.amount);
      return generate(state.promptpayId, amount);
    } catch (e) {
      return null;
    }
  });

  const amountHasError = createMemo(() => qr() === null);

  return (
    <div class="max-w-[500px] mx-auto p-4">
      <h1 class="text-3xl font-bold mb-4">PromptPay QR Generator</h1>
      <Input
        type="tel"
        value={state.promptpayId}
        onInput={(e) => setState('promptpayId', e.currentTarget.value)}
      />
      <Input
        class="mt-4"
        type="number"
        pattern="\\d*"
        value={state.amount}
        onInput={(e) => setState('amount', e.currentTarget.value)}
        hasError={amountHasError()}
      />
      <br />
      <QRCode qrData={qr} />
    </div>
  );
};

export default App;
