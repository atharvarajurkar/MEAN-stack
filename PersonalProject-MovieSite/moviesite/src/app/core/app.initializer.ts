import { AuthService } from "./services/auth.service";

export const appInitializer = (authService: AuthService) => {
  return () =>
    new Promise((resolve) => {
      // attempt to refresh token on app start up to auto authenticate
      authService.refreshToken().subscribe().add(()=>{
        resolve("")
      });
    });
};
