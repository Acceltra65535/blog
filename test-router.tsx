import { useRouter } from 'waku/router/client';
export function Test() {
  const router = useRouter();
  console.log(router);
  return null;
}
