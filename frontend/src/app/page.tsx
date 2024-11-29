import LoginComponents from "@/components/LoginComponents/LoginComponents";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function Login() {
  const accessToken = (await cookies()).get("access_token");

  if (accessToken) {
    redirect("/dashboard");
  }

  return (
    <main>
      <LoginComponents />
    </main>
  );
}
