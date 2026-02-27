import type { ReactNode } from "react";
import { Route } from "../routes/__root";

/**
 * How discord does it.
 * - Pull messages via rest api, limit and since timestamp params
 * - Edits, Deletes messages via rest api
 * - Has a WS connection that receives new messages and events, (edit, delete)
 * - For start of feed detection, it is done client side, returned length != requested length
 * - Search returns messages via API, then jump to message is done with a API reqeust that covers the date range of that mesage
 */

export function MessageProvider({ children }: { children: ReactNode }) {
  const { auth } = Route.useRouteContext();
}
