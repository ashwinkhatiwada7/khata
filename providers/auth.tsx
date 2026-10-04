import { createContext, useCallback, useContext, useMemo, useState } from "react";

type AuthContextValue = {
  isLoggedIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

// Placeholder session state: swap the bodies of signIn/signOut for real API calls.
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const signIn = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoggedIn(true);
  }, []);
  const signOut = useCallback(() => setIsLoggedIn(false), []);

  const value = useMemo(() => ({ isLoggedIn, signIn, signOut }), [isLoggedIn, signIn, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
