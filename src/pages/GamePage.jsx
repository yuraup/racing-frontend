import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RandomModal from '../components/modals/RandomModal';
import SelectModal from '../components/modals/SelectModal';
import { MODAL_STEP } from '../constants/modalStep';

export default function GamePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const config = location.state;

  const [modalStep, setModalStep] = useState(MODAL_STEP.RANDOM);

  useEffect(() => {
    if (!config) {
      navigate('/setup');
    }
  }, [config, navigate]);

  const handleGoSelect = () => {
    setModalStep(MODAL_STEP.SELECT);
  };

  return <div>{modalStep === MODAL_STEP.RANDOM && <RandomModal onNext={handleGoSelect} />}</div>;
}
