import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import firebase, { authProviders } from './firebase';

type IAuth = {
  user: firebase.User | null;
  status: 'idle' | 'pending' | 'rejected' | 'resolved';
  signInWithGoogle: () => Promise<firebase.User | null>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<IAuth | null>(null);

export function ProvideAuth({ children }: { children: ReactNode }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

function useProvideAuth(): IAuth {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [status, setStatus] = useState<'idle' | 'pending' | 'rejected' | 'resolved'>('idle');

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setStatus('resolved');
      } else {
        setUser(null);
        setStatus('resolved');
      }

      return () => unsubscribe();
    });
  }, []);

  const signInWithGoogle = async () => {
    setStatus('pending');

    const response = await firebase.auth().signInWithPopup(authProviders.googleProvider);
    setUser(response.user);
    setStatus('resolved');

    return response.user;
  };

  const signOut = async () => {
    await firebase.auth().signOut();
    setUser(null);
  };

  return {
    user,
    status,
    signInWithGoogle,
    signOut,
  };
}
