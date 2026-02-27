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
    let url = `${BASE_URL}/api/v1/messages?pageSize=5`;
    if (cursor) url += `&cursor=${cursor}`;
    console.log(url);
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

  const query = useQuery({
    queryKey: ["messages", cursor],
    queryFn: fetchMessages,
    retry: false,
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
  };
}
