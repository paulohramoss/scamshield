import { AuthForm } from "@/components/auth/AuthForm";

export default function CadastroPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[70vh]">
      <AuthForm mode="register" />
    </div>
  );
}
