import { Provider } from "@angular/core";
import { userProvider } from "./user/provider.conf";

// Add global providers here if needed in the future
export const providers: Provider[] = [
  userProvider,
];
