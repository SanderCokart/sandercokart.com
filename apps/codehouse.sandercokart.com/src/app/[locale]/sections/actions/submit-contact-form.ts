'use server';

import { getLocale } from 'next-intl/server';
import * as Yup from 'yup';
import { setLocale, ValidationError } from 'yup';
import translations from 'yup-locales';

const schema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  subject: Yup.string().required(),
  message: Yup.string().required(),
});

type Locales = 'en' | 'nl';

export async function submitContactForm(formData: FormData) {
  const locale = (await getLocale()) as Locales;
  setLocale(translations[locale]);

  let mail;

  try {
    mail = schema.validate(formData);
  } catch (error) {
    if (error instanceof ValidationError) {
      return error.errors;
    }
  }

  try {
    const response = await fetch(`${process.env.API_URL}/contact`, {
      method: 'POST',
      body: JSON.stringify(mail),
    });
    const json = await response.json();

    return json;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}
