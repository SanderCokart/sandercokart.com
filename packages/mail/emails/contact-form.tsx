import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

import * as React from 'react';

interface SimpleEmailProps {
  name: string;
  subject: string;
  message: string;
  email: string;
}

export const SimpleEmail = ({ name, subject, message, email }: SimpleEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Contact Form: {subject}</Preview>
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
          <Container className="border-primary rounded-lg border border-solid p-8">
            <Heading className="text-center">codehouse.sandercokart.com</Heading>
            <Section>
              <Heading>{subject}</Heading>
            </Section>
            <Section>
              <Row>
                <Column>
                  <Text>
                    <strong>Name:</strong> {name}
                  </Text>
                </Column>
                <Column>
                  <Text>
                    <strong>Email:</strong> {email}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Hr />
            <Section>
              <Text>{message}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default SimpleEmail;

SimpleEmail.PreviewProps = {
  name: 'John Doe',
  subject: 'Hello',
  message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum explicabo facilis laudantium non velit, voluptas? Aperiam aspernatur autem beatae blanditiis consequatur enim eveniet maiores maxime nisi nobis nostrum, porro praesentium quo ratione repellat similique ullam voluptas. Aliquam aut commodi, eos exercitationem laboriosam maxime minima, molestiae obcaecati praesentium quis repellat saepe, sed sit tempore temporibus ut voluptatem? Blanditiis deleniti dignissimos eligendi labore nobis, quae quis sapiente tempore temporibus velit? Adipisci, aliquam asperiores beatae corporis culpa dolore eaque earum eius eligendi esse excepturi, facilis hic illo iste itaque iusto nam nisi numquam obcaecati officia quidem quis quo, quos sequi temporibus ullam ut.`,
  email: 'john@doe.com',
} as SimpleEmailProps;
