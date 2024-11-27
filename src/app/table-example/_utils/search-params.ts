import { createSearchParamsCache, parseAsInteger, parseAsString } from 'nuqs/server';

export const userParsers = {
  q: parseAsString.withDefault(''),
  skip: parseAsInteger.withDefault(0),
  limit: parseAsInteger.withDefault(10),
};
export const searchParamsCache = createSearchParamsCache(userParsers);
