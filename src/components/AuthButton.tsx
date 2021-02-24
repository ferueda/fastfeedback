import { Button } from '@chakra-ui/react';
import { useAuth } from '../services/auth';

const AuthButton = () => {
  const auth = useAuth();

  if (auth?.status === 'idle') return null;

  if (auth?.status === 'pending') {
    return <Button isLoading colorScheme="blue"></Button>;
  }

  return (
    <>
      {auth?.user ? (
        <Button colorScheme="red" onClick={auth.signOut}>
          Sign Out
        </Button>
      ) : (
        <Button colorScheme="blue" onClick={auth?.signInWithGoogle}>
          Sign In
        </Button>
      )}
    </>
  );
};

export default AuthButton;
