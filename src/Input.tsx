import { Component, ComponentProps, splitProps } from 'solid-js';
import clsx from 'clsx';

type Props = ComponentProps<'input'> & {
  hasError?: boolean;
};

export const Input: Component<Props> = (props) => {
  const [ownProps, others] = splitProps(props, ['class', 'hasError']);
  const hasError = () => ownProps.hasError ?? false;
  return (
    <input
      class={clsx(
        'w-full border-2 border-solid p-2 rounded-md text-xl',
        !hasError() &&
          'border-gray-300 hover:border-blue-400 focus:border-blue-400',
        hasError() &&
          'border-red-400 hover:border-red-500 focus:border-red-500',
        'transition-colors',
        ownProps.class
      )}
      {...others}
    />
  );
};
