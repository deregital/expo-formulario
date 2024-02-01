import { httpBatchLink } from '@trpc/client';

import { appRouter } from '@/server';
import { getBaseUrl } from '@/utils/trpc';

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});
