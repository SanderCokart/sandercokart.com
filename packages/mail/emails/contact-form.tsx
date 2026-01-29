import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

import * as React from 'react';

interface ContactFormEmailProps {
  name: string;
  email: string;
  phone?: string;
  website?: string;
  message?: string;
}

export const ContactFormEmail = ({ name, email, phone, website, message }: ContactFormEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New Contact Form Submission</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                primary: '#4c1d95',
                accent: '#10b981',
              },
            },
          },
        }}>
        <Body className="bg-neutral-100 font-sans">
          <Container className="mx-auto my-12 max-w-[600px] rounded-lg bg-white shadow-sm">
            {/* Header */}
            <Section className="bg-primary rounded-t-lg p-4 text-center">
              <Heading className="text-2xl font-bold text-white">New Project Inquiry</Heading>
            </Section>

            {/* Main Content - JSON Format */}
            <Section className="mt-4 px-4">
              <pre className="border-primary m-0 whitespace-pre-wrap rounded-lg border-solid p-2 font-mono text-sm leading-relaxed">
                {JSON.stringify({ name, email, phone, website }, null, 2)}
              </pre>
            </Section>

            <Section className="mt-4 px-4">
              <pre className="border-primary m-0 whitespace-pre-wrap rounded-lg border-solid p-2 font-sans text-sm leading-relaxed">
                {message}
              </pre>
            </Section>

            {/* Quick Action Button */}
            <Section className="my-4 text-center">
              <Button
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=Re: Contact Form Submission&body=Hi ${name},%0D%0A%0D%0AThank you for your inquiry...`}
                className="bg-primary rounded-lg px-8 py-4 text-base font-bold text-white no-underline">
                REPLY TO {name}
              </Button>
            </Section>

            <Hr className="!border-primary my-0" />

            {/* Footer */}
            <Section className="bg-gray-50 px-8 py-6 text-center">
              <Text className="m-0 text-sm text-gray-500">
                &copy; {new Date().getFullYear()} codehouse.sandercokart.com. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactFormEmail;

ContactFormEmail.PreviewProps = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '555-123-4567',
  website: 'https://example.com',
  message: 'Hello, I am interested in a new website for my business.  Please contact me to discuss further.',
} as ContactFormEmailProps;
