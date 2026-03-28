import { LoginForm, AuthLayout } from "@/components/auth"

export default function LoginPage() {
  return (
    <AuthLayout sidebarDescription="A maior rede social de adoção responsável do Brasil">
      <LoginForm />
    </AuthLayout>
  )
}
