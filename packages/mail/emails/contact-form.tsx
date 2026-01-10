import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

import * as React from 'react';

interface ContactFormEmailProps {
  name: string;
  email: string;
  phone?: string;
  projectName: string;
  projectDescription: string;
  targetAudience?: string;
  budget?: string;
  timeline?: string;
  hasExistingWebsite: boolean;
  existingWebsiteLink?: string;
  needsInternationalization: boolean;
}

export const ContactFormEmail = ({
  name,
  email,
  phone,
  projectName,
  projectDescription,
  targetAudience,
  budget,
  timeline,
  hasExistingWebsite,
  existingWebsiteLink,
  needsInternationalization,
}: ContactFormEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New Project Inquiry: {projectName}</Preview>
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
          <Container className="mx-auto my-12 max-w-[600px] bg-white rounded-lg shadow-sm">
            {/* Header */}
            <Section className="px-8 py-12 bg-primary rounded-t-lg text-center">
              <Heading className="m-0 text-3xl font-bold text-white">
                codehouse.sandercokart.com
              </Heading>
              <Text className="mt-3 text-xl font-bold text-white">New Project Inquiry</Text>
            </Section>

            {/* Main Content - JSON Format */}
            <Section className="px-8 py-10">
              <pre className="m-0 rounded-lg border-accent border-solid border-4 bg-neutral-900 p-6 text-sm leading-relaxed text-gray-100 font-mono overflow-x-auto">
                <span className="text-gray-400">{'{'}</span>
                {'\n'}
                {'  '}
                <span className="bg-blue-800 text-blue-200 px-1 py-0.5 rounded">
                  "contact"
                </span>
                <span className="text-gray-400">: </span>
                <span className="text-blue-300">{'{'}</span>
                <span className="text-blue-200">
                  {'\n    "name": "'}
                  <span className="text-white">{name}</span>
                  {'",'}
                </span>
                <span className="text-blue-200">
                  {'\n    "email": "'}
                  <span className="text-white">{email}</span>
                  {'"'}
                </span>
                {phone && (
                  <span className="text-blue-200">
                    {',\n    "phone": "'}
                    <span className="text-white">{phone}</span>
                    {'"'}
                  </span>
                )}
                <span className="text-blue-200">{'\n  '}</span>
                <span className="text-blue-300">{'}'}</span>
                <span className="text-gray-400">,</span>
                {'\n'}
                {'  '}
                <span className="bg-green-800 text-green-200 px-1 py-0.5 rounded">
                  "info"
                </span>
                <span className="text-gray-400">: </span>
                <span className="text-green-400">{'{'}</span>
                <span className="text-green-200">
                  {'\n    "projectName": "'}
                  <span className="text-white">{projectName}</span>
                  {'",'}
                </span>
                <span className="text-green-200">
                  {'\n    "projectDescription": "'}
                  <span className="text-white">{projectDescription.replace(/"/g, '\\"')}</span>
                  {'"'}
                </span>
                <span className="text-green-200">{'\n  '}</span>
                <span className="text-green-400">{'}'}</span>
                <span className="text-gray-400">,</span>
                {'\n'}
                {'  '}
                <span className="bg-purple-800 text-purple-200 px-1 py-0.5 rounded">
                  "preferences"
                </span>
                <span className="text-gray-400">: </span>
                <span className="text-purple-500">{'{'}</span>
                {targetAudience && (
                  <span className="text-purple-200">
                    {'\n    "targetAudience": "'}
                    <span className="text-white">{targetAudience.replace(/"/g, '\\"')}</span>
                    {'"'}
                    {(budget || timeline) && ','}
                  </span>
                )}
                {budget && (
                  <span className="text-purple-200">
                    {'\n    "budget": "'}
                    <span className="text-white">{budget}</span>
                    {'"'}
                    {timeline && ','}
                  </span>
                )}
                {timeline && (
                  <span className="text-purple-200">
                    {'\n    "timeline": "'}
                    <span className="text-white">{timeline}</span>
                    {'"'}
                  </span>
                )}
                <span className="text-purple-200">{'\n  '}</span>
                <span className="text-purple-500">{'}'}</span>
                <span className="text-gray-400">,</span>
                {'\n'}
                {'  '}
                <span className="bg-amber-800 text-amber-100 px-1 py-0.5 rounded">
                  "knownInformation"
                </span>
                <span className="text-gray-400">: </span>
                <span className="text-amber-400">{'{'}</span>
                <span className="text-amber-100">
                  {'\n    "hasExistingWebsite": '}
                  <span className="text-amber-500">{hasExistingWebsite ? 'true' : 'false'}</span>
                </span>
                {existingWebsiteLink && (
                  <span className="text-amber-100">
                    {',\n    "existingWebsiteLink": "'}
                    <span className="text-white">{existingWebsiteLink}</span>
                    {'"'}
                  </span>
                )}
                <span className="text-amber-100">
                  {',\n    "needsInternationalization": '}
                  <span className="text-amber-500">{needsInternationalization ? 'true' : 'false'}</span>
                </span>
                <span className="text-amber-100">{'\n  '}</span>
                <span className="text-amber-400">{'}'}</span>
                {'\n'}
                <span className="text-gray-400">{'}'}</span>
              </pre>
            </Section>

            {/* Quick Action Button */}
            <Section className="text-center mt-[32px] mb-[32px] px-8">
              <Button
                href={`mailto:${email}?subject=Re: ${projectName}&body=Hi ${name},%0D%0A%0D%0AThank you for your inquiry...`}
                className="rounded-lg bg-primary px-8 py-4 text-base font-semibold text-white no-underline">
                Reply to {name}
              </Button>
            </Section>

            <Hr className="my-0 border-gray-200" />

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
  name: '[PLACEHOLDER_NAME]',
  email: '[PLACEHOLDER_EMAIL]',
  phone: '[PLACEHOLDER_PHONE]',
  projectName: '[PLACEHOLDER_PROJECT_NAME]',
  projectDescription:
    '[PLACEHOLDER_PROJECT_DESCRIPTION]',
  targetAudience: '[PLACEHOLDER_TARGET_AUDIENCE]',
  budget: '[PLACEHOLDER_BUDGET]',
  timeline: '[PLACEHOLDER_TIMELINE]',
  hasExistingWebsite: true,
  existingWebsiteLink: '[PLACEHOLDER_EXISTING_WEBSITE_LINK]',
  needsInternationalization: true,
} as ContactFormEmailProps;
