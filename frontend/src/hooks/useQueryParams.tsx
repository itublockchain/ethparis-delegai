"use client"
import { useRouter } from 'next/navigation';

export const useQueryParams = <T,>() => {
  const query = useRouter();

  return query as T;
};