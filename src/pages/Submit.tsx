import { Check } from '@phosphor-icons/react';
import * as S from '../styles/pages/Submit';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Submit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const handleButton = () => {
    navigate(state.push, { replace: true });
  };

  return (
    <S.Container>
      <S.Title>{state.title}</S.Title>
      <S.IconWrapper>
        <Check size={50} color="#f84514" />
      </S.IconWrapper>
      <S.Button onClick={handleButton}>{state.buttonText}</S.Button>
    </S.Container>
  );
};

export default Submit;
