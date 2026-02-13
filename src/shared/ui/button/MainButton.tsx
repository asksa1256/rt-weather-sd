import { Button } from "./button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MainButton = () => {
  const navigate = useNavigate();
  return <Button type='button' variant='ghost' onClick={() => navigate('/')}><ArrowLeft />메인으로</Button>
}

export default MainButton;