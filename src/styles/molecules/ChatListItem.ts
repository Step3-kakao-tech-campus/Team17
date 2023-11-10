import styled from 'styled-components';

export const Container = styled.div`
  //컨테이너 전체
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 1rem 1rem;
  cursor: pointer;
  margin-bottom: 0.6rem;
`;

export const ProfileImgWrapper = styled.span`
  //강아지 이미지
  margin-right: 1rem;
  width: 4rem;
  height: 4rem;
  border: 1px solid lightgray;
  border-radius: 27px;
`;

export const ListChatText = styled.span`
  //메시지 사이즈
  font-size: 0.8rem;
  white-space: nowrap;
  color: #9a9595;
`;

export const NameAndWalkTypeWrapper = styled.div`
  // 강아지 이름
  display: flex;
  font-size: 1rem;
  font-family: 'Gowun';
  width: 100%;
  justify-content: start;
  align-items: center;
  white-space: nowrap;

  .username {
    color: black;
    font-size: 1rem;
    margin-right: 1rem;
  }

  & > span {
    // 산책 현황
    font-size: 0.75rem;
    color: #f84514;
    white-space: nowrap;
  }
`;

export const TextWrapper = styled.div`
  // 이름, 메시지 사이 간격
  line-height: 1.7rem;
`;
