import * as S from '../../styles/molecules/Location';
import { useCallback, useEffect, useState } from 'react';
import kakaoLocation from '../../utils/kakaoLocation';
import React from 'react';
import { Circle } from '@phosphor-icons/react';

type LocationProps = {
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  location: {
    loaded: boolean;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
};

const MapLocation = ({ location, address, setAddress }: LocationProps) => {
  const [locate, setLocate] = useState({
    lat: location.coordinates.lat,
    lng: location.coordinates.lng,
  });

  const handleRefresh = useCallback(() => {
    // 사용자 위치 재설정
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocate({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (_error) => {
        // 사용자 위치 geoLocation API 사용은 https에서만 적용 가능
        alert('위치를 불러오는데 실패하였습니다.');
      },
    );
  }, []);

  useEffect(() => {
    if (location.coordinates) {
      setLocate({
        lat: location.coordinates.lat,
        lng: location.coordinates.lng,
      });
    }
  }, [location.coordinates]);

  useEffect(() => {
    if (location.loaded && locate.lat !== 0 && locate.lng !== 0) {
      const fetchKakaoAddress = async () => {
        try {
          const res = await kakaoLocation(locate);
          const kakaoAddress = res?.data?.documents[0]?.address_name;
          setAddress(kakaoAddress || '주소를 불러오고 있어요!');
        } catch (_error) {
          // console.error(error);
        }
      };
      fetchKakaoAddress();
    }
  }, [locate]);

  return (
    <>
      <S.Container className="location" onClick={handleRefresh}>
        <Circle size={8} />
        <S.LocationText className="location__text">
          {location.loaded ? address : <span>주소를 불러오고 있어요!</span>}
        </S.LocationText>
      </S.Container>
    </>
  );
};

export default React.memo(MapLocation);
