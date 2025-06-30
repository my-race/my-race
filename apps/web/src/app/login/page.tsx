import { getAuthUrl } from "../../lib/api/auth";
import Login from "./Login";

export default async function LoginPage() {
  const authUrl = await getAuthUrl();
  return <Login authUrl={authUrl.authUrl} />;
}
