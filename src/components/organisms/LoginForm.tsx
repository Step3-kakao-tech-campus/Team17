import InputGroup from '../molecules/InputGroup';
import useAuthInput from '../../hooks/useAuthInput';
//import { useEffect } from "react";
import * as Form from '../../styles/organisms/UserInputForm';
import Footer from '../atoms/Footer';
import { useNavigate } from 'react-router-dom';
import LinkText from '../atoms/LinkText';
import * as Link from '../../styles/atoms/Link';
// import { login } from '../../apis/user';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../../store/slices/userSlice';
import { useState } from 'react';
import Msg from '../atoms/Msg';
import { AiOutlineCheckCircle, AiFillCheckCircle } from 'react-icons/ai';
// import { setLocalStorageWithExp } from '../../utils/localStorage';

const LoginForm = () => {
  // const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [keepLogin, setKeepLogin] = useState(true);
  const { value, handleOnChange, handleOnCheck, invalidCheck } = useAuthInput({
    email: '',
    password: '',
    username: '',
    passwordConfirm: '',
  });

  // const loginReq = () => {
  //   login({
  //     email: value.email,
  //     password: value.password,
  //   })
  //     .then((res: { headers: { authorization: any } }) => {
  //       setError('');
  //       dispatch(
  //         setUser({
  //           user: value.user,
  //         }),
  //       );
  //       //console.log(res.headers.authorization);
  //       setLocalStorageWithExp('user', res.headers.authorization, 1000 * 1440);
  //       navigate('/');
  //     })
  //     .catch((err: { request: { response: string } }) => {
  //       console.log(err.request.response);
  //       const errObject = JSON.parse(err.request.response);
  //       setError(errObject.error.message);
  //     });
  // };

  const navigate = useNavigate();

  const isValid =
    invalidCheck['email'] === 'true' && invalidCheck['password'] === 'true';

  return (
    <>
      <Form.Container>
        <Form.Title>로그인</Form.Title>
        <div className="welcome__text">환영합니다!</div>
        <Form.Box>
          <InputGroup
            id="email"
            name="email"
            type="email"
            placeholder="이메일"
            label="이메일"
            value={value.email}
            onChange={handleOnChange}
            onBlur={() => handleOnCheck('email', value.email)}
            invalid={invalidCheck}
            className="login-email"
          />
          <InputGroup
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호"
            label="비밀번호"
            value={value.password}
            onChange={handleOnChange}
            onBlur={() => handleOnCheck('password', value.password)}
            invalid={invalidCheck}
            className="login-password"
          />
          {error !== '' ? (
            <Msg message={error} className="login-error" />
          ) : null}
          <Form.Button
            onClick={() => {
              // api 로그인 요청
              // loginReq();
            }}
            disabled={!isValid}
          >
            로그인
          </Form.Button>
          <Link.TextContainer>
            <span
              onClick={() => setKeepLogin(!keepLogin)}
              className="login__check"
            >
              {keepLogin ? (
                <AiFillCheckCircle
                  color="#a59d52"
                  size="18"
                  className="check__icon"
                />
              ) : (
                <AiOutlineCheckCircle
                  color="#a59d52"
                  size="18"
                  className="check__icon"
                />
              )}
              로그인 유지
            </span>
            <LinkText to="/signup" text="회원가입" className="register__text" />
          </Link.TextContainer>
        </Form.Box>
      </Form.Container>
      <Footer />
    </>
  );
};

export default LoginForm;
