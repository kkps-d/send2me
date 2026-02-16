import { useQuery } from "@tanstack/react-query";
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
export type MessageDto = z.infer<typeof messageDtoSchema>;
//#endregion

export function useMessages(cursor?: string) {
  const { auth } = Route.useRouteContext();

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

  const { isSuccess, isLoading, error, data } = useQuery({
    queryKey: ["messages", cursor],
    queryFn: fetchMessages,
    retry: false,
  });

  if (error) {
    const zodError = JSON.parse(error.message);
    throw new Error(
      `API response does not match expected schema!\n${zodError.name}\n${zodError.message}`,
    );
  }

  return {
    isSuccess,
    isLoading,
    messages: data?.messages,
    nextCursor: data?.nextCursor,
  };
}
