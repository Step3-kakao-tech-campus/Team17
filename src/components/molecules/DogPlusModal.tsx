import { useState, PropsWithChildren, useCallback, useRef, PropsWithChildren } from 'react';
import * as S from '../../styles/molecules/DogEditModal';
import Image from '../atoms/Image';
// import { postDog } from '../../apis/dog';
import { Pen, X } from '@phosphor-icons/react';
import useDogInput from '../../hooks/useDogInput';
import Select from 'react-select';
import { dogBreed, dogSex, dogSize } from '../../utils/DropDown';
// import { postDogProfile } from '../../apis/dog';

type ModalDefaultType = {
  onClickToggleModal: () => void;
};

// type dogProp = {
//   image: string;
//   name: string;
//   sex: string;
//   breed: string;
//   size: string;
//   specificity: string;
//   age: number;
// };
// type dataProp = {
//   success: boolean;
//   response: dogProp;
//   error: null;
// };
export default function DogEditModal({
  onClickToggleModal,
}: PropsWithChildren<ModalDefaultType>) {
  const [edit, setEdit] = useState<boolean>(false);
  const { value, handleOnChange, handleOnSpecChange } = useDogInput({
    name: '',
    specificity: '',
    age: '',
  });
  const formData = new FormData();
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      setSelectedImage(e.target.files[0]);
      console.log(e.target.files[0].name);
    },
    [formData],
  );

  const onUploadImageClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  // DropDown Style
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      border: 'none', // 테두리 없애기
      boxShadow: 'none', // 그림자 효과 없애기
    }),
  };
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectSex, setSelectSex] = useState(dogSex[0]);
  const [selectBreed, setSelectBreed] = useState(dogBreed[0]);
  const [selectSize, setSelectSize] = useState(dogSize[0]);

  // test
  // console.log('sex', selectSex);
  // console.log('breed', selectBreed);
  // console.log('size', selectSize);
  // console.log('photo', selectedImage);
  // console.log('name', value.name);
  // console.log('age', value.age);

  // const handleEnrollClick = () => {
  //   // 필드의 데이터 가져오기
  //   const name = value.name;
  //   const image = selectedImage;
  //   const sex = selectSex.value;
  //   const breed = selectBreed.value;
  //   const specificity = value.specificity;
  //   const age = value.age;
  //   const size = selectSize.value;
  //   // 필드가 비어 있는지 확인
  //   if (!name || !image || !sex || !breed || !specificity || !age || !size) {
  //     alert('필수 항목을 모두 입력하세요.');
  //     return;
  //   }
  //   // 데이터가 비어 있지 않으면 요청을 보냄
  //   formData.append('name', name);
  //   formData.append('image', image);
  //   formData.append('sex', sex);
  //   formData.append('breed', breed);
  //   formData.append('specificity', specificity);
  //   formData.append('age', age);
  //   formData.append('size', size);
  //   postDogProfile(formData)
  //     .then(() => {
  //       alert('강아지 프로필이 등록되었습니다.');
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  return (
    <S.ModalContainer>
      <S.DialogBox>
        <S.CancelButton>
          <X size="24" onClick={onClickToggleModal} color="black" />
        </S.CancelButton>
        <S.MainContainer>
          <S.ImageContainer>
            {edit ? (
              <>
                {selectedImage ? (
                  //썸네일 표시
                  <Image
                    alt="not Found"
                    src={URL.createObjectURL(selectedImage)}
                    className="profile__image"
                  ></Image>
                ) : (
                  <>
                    <label className="input-file-button" htmlFor="input-file">
                      업로드
                    </label>
                    <input
                      type="file"
                      id="input-file"
                      accept="image/*"
                      name="myImage"
                      ref={inputRef}
                      onChange={onUploadImage}
                      onClick={onUploadImageClick}
                      style={{ display: 'none' }}
                    ></input>
                  </>
                )}
              </>
            ) : (
              <Image src="./images/exampleDog.png" alt="강아지추가"></Image>
            )}
          </S.ImageContainer>

          <div className="pen" style={{ display: edit ? 'none' : 'block' }}>
            <Pen size={18} onClick={() => setEdit(!edit)} />
          </div>
          <S.DogInfo>
            <div className="block">
              <span className="title"> 이름 </span>
              <S.Input
                type="text"
                name="name"
                value={value.name}
                onChange={handleOnChange}
              />
            </div>
            <div className="block">
              <span className="title"> 성별 </span>
              {/* <S.Input
                type="text"
                name="sex"
                value={value.sex}
                onChange={handleOnChange}
              /> */}
              <Select
                options={dogSex}
                defaultValue={dogSex[0]}
                styles={customStyles}
                value={selectSex}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    setSelectSex(selectedOption);
                  }
                }}
              />
            </div>
            <div className="block">
              <span className="title"> 견종 </span>
              <Select
                options={dogBreed}
                defaultValue={dogBreed[0]}
                styles={customStyles}
                value={selectBreed}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    setSelectBreed(selectedOption);
                  }
                }}
              />
            </div>
            <div className="block">
              <span className="title"> 나이 </span>
              <S.Input
                type="text"
                name="age"
                value={value.age}
                onChange={handleOnChange}
              />
            </div>
            <div className="block">
              <span className="title">분류 </span>
              <Select
                options={dogSize}
                defaultValue={dogSize[0]}
                styles={customStyles}
                value={selectSize}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    setSelectSize(selectedOption);
                  }
                }}
              />
            </div>
          </S.DogInfo>
        </S.MainContainer>
        <S.UniqueInfo>
          <div>특이사항</div>
          <textarea
            placeholder="ex) 저희 강아지는 수줍음이 많아서 낮을 많이 가립니다. 그래서 천천히 다가가주시길 바랍니다."
            name="specificity"
            value={value.specificity}
            onChange={handleOnSpecChange}
            style={{
              backgroundColor: '#e2e2e2',
              border: 'none',
              width: '100%',
              height: '100%',
              borderRadius: '0.5rem',
              outline: 'none',
            }}
          ></textarea>
        </S.UniqueInfo>
        <S.Button onClick={() => handleEnrollClick()}> 등록하기 </S.Button>
      </S.DialogBox>
      <S.Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </S.ModalContainer>
  );
}
