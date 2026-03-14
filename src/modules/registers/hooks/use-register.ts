import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateRegister = () => {
  const trpc = useTRPC();

  return useMutation(
    trpc.register.create.mutationOptions({
      onSuccess: () => {
        toast.success("Cadastro realizado com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao realizar cadastro! Tente novamente mais tarde.");
      },
    }),
  );
};
