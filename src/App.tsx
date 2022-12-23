import { Component, createMemo, Show } from 'solid-js';
import { createAppStore } from './store';
import { generate } from 'promptparse/dist/generators/promptpay/AnyID';
import { QRCode } from './QRCode';
import { Input } from './Input';

const promptpayIdPattern = /\d{8,15}/;
const amountPattern = /d*/;

const App: Component = () => {
  const [state, setState] = createAppStore();

  const qr = createMemo(() => {
    if (!promptpayIdPattern.test(state.promptpayId)) return null;
    if (!amountPattern.test(state.amount)) return null;
    return generate(state.promptpayId, Number(state.amount));
  });

  const promptpayIdHasError = createMemo(
    () => !promptpayIdPattern.test(state.promptpayId)
  );
  const amountHasError = createMemo(() => !amountPattern.test(state.amount));

  return (
    <div class="max-w-[500px] mx-auto p-4">
      <h1 class="text-3xl font-bold mb-4">PromptPay QR Generator</h1>
      <Input
        type="number"
        pattern="\\d*"
        placeholder="PromptPay ID"
        hasError={promptpayIdHasError()}
        value={state.promptpayId}
        onInput={(e) => setState('promptpayId', e.currentTarget.value)}
      />
      <Input
        class="mt-4"
        type="number"
        pattern="\\d*"
        placeholder="Amount"
        hasError={amountHasError()}
        value={state.amount}
        onInput={(e) => setState('amount', e.currentTarget.value)}
      />
      <div class="mt-4">
        <Show when={qr() !== null}>
          <QRCode qrData={qr} />
        </Show>
      </div>
    </div>
  );
};

export default App;
