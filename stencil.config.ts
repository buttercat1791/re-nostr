import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  taskQueue: 'async',
  namespace: 're-nostr',
  globalStyle: 'src/global/variables.css',
  outputTargets: [
    {
      type: 'dist',
      isPrimaryPackageOutputTarget: true,
    },
  ],
  devServer: {
    initialLoadUrl: 'pages/popover.html',
  },
};
