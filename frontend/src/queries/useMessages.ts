import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Route } from "../routes/__root";
import { BASE_URL } from "../utils/baseUrl";
import z from "zod";

//#region Related responses/DTOs
const messageDtoSchema = z.object({
  messageId: z.number(),
  createdAt: z.coerce.date(),
  content: z.string(),
});
const messageResponseSchema = z.object({
  messages: z.array(messageDtoSchema),
  nextCursor: z.string().optional(),
});
const newMessageSuccessResponseSchema = z.object({
  newMessageId: z.number(),
});
export type MessageDto = z.infer<typeof messageDtoSchema>;
type NewMessageDto = {
  content: string;
};
//#endregion

// TODO: Probably should put mutate messages into a separate hook, since the msgactionbar doesn't really care about reading messages. Should reduce unnecessary refreshes?
export function useMessages(cursor?: string) {
  const { auth } = Route.useRouteContext();
  const queryClient = useQueryClient();

  async function fetchMessages() {
    const url = `${BASE_URL}/api/v1/messages`;
    const result = await auth.aFetch(url, {
      method: "GET",
    });
    const { success, error, data } = messageResponseSchema.safeParse(
      await result.json(),
    );

    if (!success) {
      throw new Error(JSON.stringify(error, null, 2));
    }

    return data;
  }

  async function createMessage(content: string) {
    // TODO: Error handling
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

  const query = useQuery({
    queryKey: ["messages", cursor],
    queryFn: fetchMessages,
    retry: false,
  });

  const createMessageMutation = useMutation({
    mutationFn: createMessage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["messages"] }),
  });

  if (query.error) {
    const zodError = JSON.parse(query.error.message);
    throw new Error(
      `API response does not match expected schema!\n${zodError.name}\n${zodError.message}`,
    );
  }

  return {
    queryLoading: query.isLoading,
    querySucess: query.isSuccess,
    messages: query.data?.messages,
    nextCursor: query.data?.nextCursor,
    createMessage: createMessageMutation.mutateAsync,
    createPending: createMessageMutation.isPending,
    createSuccess: createMessageMutation.isSuccess,
  };
}
