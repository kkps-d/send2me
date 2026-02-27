import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Route } from "../routes/__root";
import { BASE_URL } from "../utils/baseUrl";
import z from "zod";

const newMessageSuccessResponseSchema = z.object({
  newMessageId: z.number(),
});

type NewMessageDto = {
  content: string;
};

export function useCreateMessage() {
  const { auth } = Route.useRouteContext();
  const queryClient = useQueryClient();

  async function createMessage(content: string) {
    const dto: NewMessageDto = {
      content,
    };
    const url = `${BASE_URL}/api/v1/messages`;
    const result = await auth.aFetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });
    const { success, error, data } = newMessageSuccessResponseSchema.safeParse(
      await result.json(),
    );

    if (!success) {
      throw new Error(JSON.stringify(error, null, 2));
    }

    return data;
  }

  const createMessageMutation = useMutation({
    mutationFn: createMessage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["messages"] }),
  });

  return {
    createMessage: createMessageMutation.mutateAsync,
    createPending: createMessageMutation.isPending,
    createSuccess: createMessageMutation.isSuccess,
  };
}
