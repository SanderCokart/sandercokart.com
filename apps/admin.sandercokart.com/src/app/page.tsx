import Link from 'next/link';

import { Page } from '@/types/common';

import { auth } from '@/lib/auth';

export default function LoginPage({}: Page) {
  const session = auth();

  return (
    <div>
      <Link href="/login">login</Link>
      <a href="/api/auth/signout">logout</a>
      {JSON.stringify(session, null, 2)}
    </div>
  );
}
