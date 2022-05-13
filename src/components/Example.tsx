import { FC, useMemo } from 'react';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';

import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

const connector = new WalletConnectConnector({
  options: {
    qrcode: true,
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
