import { House, ChatsCircle, User } from '@phosphor-icons/react';
import * as S from '../../styles/molecules/BottomNavBar';
import { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';

// 하단 네비게이션 바
const BottomNavBar = () => {
  const [active, setActive] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const useQuery = () => {
    return location.pathname;
  };

  console.log(useQuery());

  // 클릭 시 해당 페이지로 이동
  const handleActive = useCallback((page: string) => {
    setActive(page);

    switch (page) {
      case '/':
        navigate('/');
        break;
      case '/chatlist': // chat
        navigate('/chatlist');
        break;
      case '/profile': // profile
        navigate('/profile');
        break;
      default:
        break;
    }
  }, []);

  return (
    <S.Container>
      <S.NavItemWrapper onClick={() => handleActive('/')}>
        <House
          size={25}
          weight={useQuery() === '/' ? 'fill' : 'regular'}
          color={useQuery() === '/' ? '#A59D52' : '#999999'}
        />
        <S.BottomNavText className={useQuery() === '/' ? 'active' : ''}>
          home
        </S.BottomNavText>
      </S.NavItemWrapper>
      <S.NavItemWrapper onClick={() => handleActive('/chatlist')}>
        <ChatsCircle
          size={25}
          weight={useQuery() === '/chatlist' ? 'fill' : 'regular'}
          color={useQuery() === '/chatlist' ? '#A59D52' : '#999999'}
        />
        <S.BottomNavText className={useQuery() === '/chatlist' ? 'active' : ''}>
          chat
        </S.BottomNavText>
      </S.NavItemWrapper>
      <S.NavItemWrapper onClick={() => handleActive('/profile')}>
        <User
          size={25}
          weight={useQuery() === '/profile' ? 'fill' : 'regular'}
          color={useQuery() === '/profile' ? '#A59D52' : '#999999'}
        />
        <S.BottomNavText className={useQuery() === '/profile' ? 'active' : ''}>
          profile
        </S.BottomNavText>
      </S.NavItemWrapper>
    </S.Container>
  );
};

export default React.memo(BottomNavBar);
