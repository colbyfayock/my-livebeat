import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Models } from 'appwrite';

import { logIn, verifySession, getCurrentSession, deleteCurrentSession, VerifySessionOptions } from '@/lib/auth';
import { getTeams } from '@/lib/user';

interface LiveBeatAuthContext {
  session?: Models.Session;
  isAdmin?: boolean;
  logIn: Function;
  logOut: Function;
  verifySession: Function;
}

export const AuthContext = createContext<LiveBeatAuthContext | undefined>(undefined)

interface AuthProviderProps {
  children?: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuthState();
  return (
    <AuthContext.Provider value={auth}>
      { children }
    </AuthContext.Provider>
  )
}

export function useAuthState() {
  const [session, setSession] = useState<Models.Session>();
  const [isAdmin, setIsAdmin] = useState<boolean>();

  useEffect(() => {
    (async function run() {
      const data = await getCurrentSession();
      setSession(data.session);
    })();
  }, [])

  useEffect(() => {
    if ( !session?.$id ) return;
    (async function run() {
      const { teams } = await getTeams();
      const isAdmin = !!teams.find(team => team.$id === import.meta.env.VITE_APPWRITE_TEAM_ADMIN_ID)
      setIsAdmin(isAdmin);
    })();
  }, [session?.$id])

  async function logOut() {
    await deleteCurrentSession();
    setSession(undefined);
  }

  async function verifySessionAndSave(options: VerifySessionOptions) {
    const data = await verifySession(options);
    setSession(data);
  }

  return {
    session,
    isAdmin,
    logIn,
    logOut,
    verifySession: verifySessionAndSave
  }
}

export function useAuth() {
  const auth = useContext(AuthContext);

  if ( !auth ) {
    throw new Error('useAuth can not be used outside of AuthContext')
  }

  return auth;
}