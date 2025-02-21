import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {ReactNode} from 'react';

type Props = {
  children: ReactNode;
  locale: string;
};

export default async function BaseLayout({children, locale}: Props) {
  // Получаем сообщения для текущего языка
  const messages = await getMessages({locale});

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
