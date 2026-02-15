import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './button';

const MainButton = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  return (
    <Button
      type='button'
      variant='ghost'
      className={className}
      onClick={() => navigate('/')}
    >
      <ArrowLeft />
      메인으로
    </Button>
  );
};

export default MainButton;
