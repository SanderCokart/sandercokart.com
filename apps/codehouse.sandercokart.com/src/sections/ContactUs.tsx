import c from 'classnames';
import { useTranslation } from 'next-i18next';

import { useState } from 'react';

import type { FormEvent } from 'react';

type Status = 'success' | 'error' | 'warning';

export default function ContactUs() {
  const { t } = useTranslation(['common']);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const [response, setResponse] = useState<null | { message: string; status: Status }>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="section" id="contact">
      <h2 className="title">{t('home:makeAnAppointment')}</h2>
      <form
        className="items-left mx-auto flex min-h-[838px] max-w-4xl flex-col gap-4 p-4 text-xl sm:text-2xl"
        onSubmit={onSubmit}>
        <label htmlFor="name">{t('home:name')}:</label>
        <input
          required
          className="base-input"
          id="name"
          name="name"
          placeholder={t('home:example.name') as string}
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label htmlFor="email">{t('home:email')}:</label>
        <input
          required
          className="base-input"
          id="email"
          name="email"
          placeholder={t('home:example.email') as string}
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="subject">{t('home:subject')}:</label>
        <input
          required
          className="base-input"
          id="subject"
          maxLength={60}
          minLength={3}
          name="subject"
          placeholder={t('home:subject') as string}
          type="text"
          value={subject}
          onChange={e => setSubject(e.target.value)}
        />
        <label htmlFor="message">{t('home:message')}:</label>
        <div className="relative">
          <textarea
            required
            className="base-input pr-12"
            cols={30}
            id="message"
            name="message"
            placeholder={t('home:draft') as string}
            rows={8}
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-baseline gap-8 md:flex-row">
          <button
            className="bg-secondaryLight w-48 shrink-0 self-center rounded-xl p-3 font-bold text-white transition-transform hover:scale-110 active:scale-90 sm:self-baseline"
            type="submit">
            {t('home:send')}
          </button>

          <p
            className={c(
              'grow rounded-md bg-zinc-200 p-4 text-center text-xl font-bold empty:hidden dark:bg-zinc-800',
              {
                'text-primaryLight dark:text-secondaryLight': response?.status === 'success',
                'border-2 border-red-600 text-white': response?.status === 'error',
              },
            )}>
            {response?.message}
          </p>
        </div>
      </form>
    </section>
  );
}
