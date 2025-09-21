import Login from "./Login";

interface LoginPageProps {
  searchParams: {
    callbackUrl?: string;
  };
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { callbackUrl } = await searchParams;
  return <Login callbackUrl={callbackUrl} />;
}
