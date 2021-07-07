import { Application, Identifiable, Id } from "@types";

interface SafeGuard {
  ensureUserPermission(
    userId: Id,
    application: Identifiable<Application>
  ): Promise<void>;
}

export { SafeGuard };
