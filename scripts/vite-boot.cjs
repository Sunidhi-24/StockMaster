#!/usr/bin/env node
// Small bootstrap to ensure `globalThis.crypto.getRandomValues` exists
// before Vite and other tooling load.
try {
  const nodeCrypto = require('crypto');
  const nodeWebCrypto = nodeCrypto.webcrypto;
  // Ensure globalThis.crypto exists
  if (!globalThis.crypto) {
    if (nodeWebCrypto && typeof nodeWebCrypto.getRandomValues === 'function') {
      globalThis.crypto = nodeWebCrypto;
    } else if (typeof nodeCrypto.randomFillSync === 'function') {
      globalThis.crypto = {
        getRandomValues: (arr) => nodeCrypto.randomFillSync(arr),
      };
    }
  }

  // Also attach getRandomValues directly onto the Node `crypto` export
  // so ESM imports like `import crypto from 'node:crypto'` expose it.
  try {
    if (typeof nodeCrypto.getRandomValues !== 'function') {
      if (nodeWebCrypto && typeof nodeWebCrypto.getRandomValues === 'function') {
        nodeCrypto.getRandomValues = nodeWebCrypto.getRandomValues.bind(nodeWebCrypto);
      } else if (typeof nodeCrypto.randomFillSync === 'function') {
        nodeCrypto.getRandomValues = (arr) => nodeCrypto.randomFillSync(arr);
      }
    }
  } catch (e) {
    // ignore
  }
} catch (e) {
  // ignore
}

// Start Vite programmatically so our `globalThis.crypto` shim is present
// in the same process that Vite runs in.
(async () => {
  try {
    const vite = await import('vite');
    const { createServer } = vite;
    const server = await createServer();
    await server.listen();
    server.printUrls();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
