import type { CodegenConfig } from '@graphql-codegen/cli';
import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files';

const config: CodegenConfig = {
  schema: 'server/src/graphql/**/*.graphql',
  generates: {
    'server/src/generated': defineConfig({
      resolverGeneration: 'minimal',
      mode: 'modules',
      resolverRelativeTargetDir: './resolvers',
      resolverTypesPath: './types.generated.ts',
      resolverMainFile: './resolvers.generated.ts',
      typeDefsFilePath: './typeDefs.generated.ts',
      tsConfigFilePath: '../../../tsconfig.base.json',
    }),

    'client/src/api/generated.ts': {
      plugins: ['typescript-operations', 'typescript-rtk-query'],
      config: {
        importBaseApiFrom: './baseApi',
        importTypesFrom: '@gfl/shared',
        exportHooks: true,
      },
    },

    'packages/shared/src/types/index.ts': {
      plugins: ['typescript'],
    },
  },
};

export default config;
