import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  taskQueue: 'async',
  namespace: 're-nostr',
  globalScript: 'dist/collection/global/global.js',
  globalStyle: 'src/global/global.css',
  outputTargets: [
    {
      type: 'dist',
      isPrimaryPackageOutputTarget: true,
    },
  ],
  devServer: {
    initialLoadUrl: 'pages/popover.html',
  },
  validatePrimaryPackageOutputTarget: true,
};
