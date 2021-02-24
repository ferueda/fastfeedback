import { Container } from '../components/Container';
import { useAuth } from '../services/auth';

import AuthButton from '../components/AuthButton';

const Index = () => {
  const auth = useAuth();
  return (
    <Container height="100vh">
      <AuthButton />
      {auth?.user?.displayName}
    </Container>
  );
};

export default Index;
