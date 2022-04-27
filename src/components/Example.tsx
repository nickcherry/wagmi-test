import { FC, useMemo } from 'react';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';

const alchemyApiKey = process.env.REACT_APP_ALCHEMY_API_KEY;

const connector = new CoinbaseWalletConnector({
  options: {
    appName: 'wagmi.sh',
    jsonRpcUrl: `https://eth-mainnet.alchemyapi.io/v2/${alchemyApiKey}`,
  },
});

const Example: FC = () => {
  const { data: account } = useAccount();
  const { connect } = useConnect({ connector });
  const { data: signedMessage, signMessage } = useSignMessage();
  const { disconnect } = useDisconnect();

  const actions = useMemo(() => {
    if (!account) {
      return <button onClick={() => connect()}>Connect</button>;
    }

    return (
      <>
        <button onClick={() => signMessage({ message: 'gm' })}>
          Sign Message
        </button>
        <button onClick={() => disconnect()}>Disconnect</button>
      </>
    );
  }, [account, connect, signMessage, disconnect]);

  return (
    <div>
      {actions}
      <pre>
        <code>
          {JSON.stringify(
            { address: account?.address, signedMessage },
            null,
            2,
          )}
        </code>
      </pre>
    </div>
  );
};

export { Example };
