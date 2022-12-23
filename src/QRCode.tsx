import { Component, createResource } from 'solid-js';
import qrCode from 'qrcode';

interface Props {
  qrData: () => string | null;
}

export const QRCode: Component<Props> = ({ qrData }) => {
  const [imageUrl] = createResource(qrData, async (data) => {
    return await qrCode.toDataURL(data, {
      width: 1024,
    });
  });

  return <img class="w-full" src={imageUrl()} />;
};
