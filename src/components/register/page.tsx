import { RegisterForm, AuthLayout } from "@/components/auth"

export default function RegisterPage() {
  return (
    <AuthLayout sidebarDescription="Junte-se à maior rede social de adoção responsável do Brasil">
      <RegisterForm />
    </AuthLayout>
  )
}
