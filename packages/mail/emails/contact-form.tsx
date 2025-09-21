import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  render,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

import * as React from 'react';

interface ContactFormEmailProps {
  projectName: string;
  projectDescription: string;
  targetAudience?: string;
  desiredFeatures?: string;
  budget?: string;
  timeline?: string;
  hasExistingWebsite: boolean;
  existingWebsiteLink?: string;
  needsInternationalization: boolean;
}

export const ContactFormEmail = ({
  projectName,
  projectDescription,
  targetAudience,
  desiredFeatures,
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
              },
            },
          },
        }}>
        <Body className="font-sans">
          <Container className="border-primary mx-auto my-10 rounded-lg border border-solid p-8">
            <Section className="mb-8 text-center">
              <Heading className="text-primary text-3xl font-bold">codehouse.sandercokart.com</Heading>
            </Section>
            <Hr className="mb-8" />
            <Section className="mb-6">
              <Heading as="h2" className="text-primary mb-4 text-2xl font-semibold">
                New Project Inquiry
              </Heading>
            </Section>
            <Section className="mb-4">
              <Text className="m-0 text-base leading-relaxed">
                <strong className="text-primary">Project Name:</strong> {projectName}
              </Text>
            </Section>
            <Section className="mb-4">
              <Text className="m-0 text-base leading-relaxed">{projectDescription}</Text>
            </Section>
            {targetAudience && (
              <Section className="mb-4">
                <Text className="m-0 text-base leading-relaxed">
                  <strong className="text-primary">Target Audience:</strong> {targetAudience}
                </Text>
              </Section>
            )}
            {desiredFeatures && (
              <Section className="mb-4">
                <Text className="m-0 text-base leading-relaxed">
                  <strong className="text-primary">Desired Features:</strong> {desiredFeatures}
                </Text>
              </Section>
            )}
            {budget && (
              <Section className="mb-4">
                <Text className="m-0 text-base leading-relaxed">
                  <strong className="text-primary">Budget:</strong> {budget}
                </Text>
              </Section>
            )}
            {timeline && (
              <Section className="mb-4">
                <Text className="m-0 text-base leading-relaxed">
                  <strong className="text-primary">Timeline:</strong> {timeline}
                </Text>
              </Section>
            )}
            <Section className="mb-4">
              <Text className="m-0 text-base leading-relaxed">
                <strong className="text-primary">Has Existing Website:</strong> {hasExistingWebsite ? 'Yes' : 'No'}
              </Text>
            </Section>
            {hasExistingWebsite && existingWebsiteLink && (
              <Section className="mb-4">
                <Text className="m-0 text-base leading-relaxed">
                  <strong className="text-primary">Existing Website Link:</strong> {existingWebsiteLink}
                </Text>
              </Section>
            )}
            <Section className="mb-4">
              <Text className="m-0 text-base leading-relaxed">
                <strong className="text-primary">Needs Internationalization:</strong>{' '}
                {needsInternationalization ? 'Yes' : 'No'}
              </Text>
            </Section>
            <Hr className="my-8" />
            <Section className="text-center text-gray-500">
              <Text className="m-0 text-sm">
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
  projectName: 'Awesome Project',
  projectDescription:
    'We need a website that can do amazing things and is super cool.  It needs to be very performant and accessible.',
  targetAudience: 'Everyone',
  desiredFeatures: 'Login, signup, blog, e-commerce, and AI integration',
  budget: '$10,000 - $20,000',
  timeline: '3-6 months',
  hasExistingWebsite: false,
  needsInternationalization: true,
} as ContactFormEmailProps;
