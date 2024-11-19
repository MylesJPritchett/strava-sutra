import { useRouter } from 'next/router';

export default function ErrorPage() {
  const router = useRouter();
  const { error } = router.query;

  return (
    <div>
      <h1>Error</h1>
      {error && <p>Error: {error}</p>}
      <p>There was an issue with the authentication process. Please try again later.</p>
    </div>
  );
}
