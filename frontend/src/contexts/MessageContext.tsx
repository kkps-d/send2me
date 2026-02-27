import { createContext, useContext } from "react";
import z from "zod";

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

export const MessageContext = createContext(undefined);

export const useMessages = () => useContext(MessageContext);
