import type { CodegenConfig } from '@graphql-codegen/cli';
import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files';

const config: CodegenConfig = {
  schema: 'server/src/graphql/**/*.graphql',
  documents: ['client/src/**/*.graphql'],
  generates: {
    'server/src/generated': defineConfig({
      resolverGeneration: 'minimal',
      mode: 'modules',
      resolverRelativeTargetDir: './resolvers',
      resolverTypesPath: './types.generated.ts',
      resolverMainFile: './resolvers.generated.ts',
      typeDefsFilePath: './typeDefs.generated.ts',
      tsConfigFilePath: './tsconfig.base.json',
    }),

    'client/src/api/generated.ts': {
      plugins: [
        {
          add: {
            content:
              'class TypedDocumentString<TResult = unknown, TVariables = unknown> extends String { declare __apiType?: [TResult, TVariables] }',
          },
        },
        'typescript',
        'typescript-operations',
        'typescript-rtk-query',
      ],
      config: {
        importBaseApiFrom: './baseApi',
        documentMode: 'documentNode',
        enumsAsTypes: true,
        exportHooks: true,
      },
    },
  },
};

export default config;
