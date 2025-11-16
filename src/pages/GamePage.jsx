import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import generateRandomCards from '../utils/generateRandomCards';
import RandomModal from '../components/modals/RandomModal';
import SelectModal from '../components/modals/SelectModal';
import { MODAL_STEP } from '../constants/modalStep';

export default function GamePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const config = location.state;

  const [modalStep, setModalStep] = useState(MODAL_STEP.RANDOM);
  const [cards] = useState(() => (config ? generateRandomCards(config.roundNumber) : []));

  useEffect(() => {
    if (!config) {
      navigate('/setup');
    }
  }, [config, navigate]);

  const handleGoSelect = () => {
    setModalStep(MODAL_STEP.SELECT);
  };

  const handleSelectCard = () => {
    setModalStep(MODAL_STEP.RESULT);
  };

  return (
    <div>
      {modalStep === MODAL_STEP.RANDOM && <RandomModal onNext={handleGoSelect} />}{' '}
      {modalStep === MODAL_STEP.SELECT && (
        <SelectModal cards={cards} onSelectCard={handleSelectCard} />
      )}
    </div>
  );
}
