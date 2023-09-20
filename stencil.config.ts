import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  taskQueue: 'async',
  namespace: 're-nostr',
  outputTargets: [
    {
      type: 'dist',
    },
    {
      type: 'dist-custom-elements',
      generateTypeDeclarations: true,
      includeGlobalScripts: true,
    },
  ],
};
