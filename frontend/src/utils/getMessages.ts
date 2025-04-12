import { getMessages } from 'next-intl/server';

export async function fetchMessages(locale?: string | any) {
  return await getMessages(locale);
}
