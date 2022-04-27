import { FC } from 'react';
import { createClient, Provider } from 'wagmi';
import { Example } from './Example';

const client = createClient();

const App: FC = () => {
  return (
    <Provider client={client}>
      <Example />
    </Provider>
  );
};

export { App };
