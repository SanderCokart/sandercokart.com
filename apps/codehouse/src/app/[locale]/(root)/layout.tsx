import type { FC, ReactNode } from 'react';

import { Header } from './(components)/header';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = async ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
