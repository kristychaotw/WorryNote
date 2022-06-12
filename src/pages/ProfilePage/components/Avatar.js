import React, { useState, useEffect } from "react";
import { useAuthUser } from "../../../firebase";
import styled from "styled-components";
import avatarsvg from "../../../components/images/icons/avatar.svg";
import { BtnSubmit } from "../../../components/styles/component.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase";
import { updateProfile } from "firebase/auth";
import { update } from "../../../reducers/user";
import { useDispatch } from "react-redux";
import Modal from "../../../components/Modal";

export const Wrapper = styled.div`
  text-align: start;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 30px;
  grid-template-areas:
    "avatar avatar "
    "input uploadbtn";

  justify-items: center;

  button {
    grid-area: uploadbtn;
    border: 1px solid ${({ theme }) => theme.colors.dark};
    border-radius: 3px;
    padding: 0px 10px;
    color: #000;
  }
`;

export const StyledAvatar = styled.img`
  vertical-align: middle;
  width: 150px;
  height: 150px;
  border-radius: 100%;
  border: 2px outset #8ba6bc;
  grid-area: avatar;
  object-fit: cover;
  background-color: #fff;
`;

export default function Avatar() {
  const currentUser = useAuthUser().currentUser;
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState(`${avatarsvg}`);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  const handleClick = () => {
    const fileRef = ref(storage, currentUser.uid + ".png");
    setLoading(true);
    uploadBytes(fileRef, photo)
      .then(() => {
        getDownloadURL(fileRef)
          .then((url) => {
            setPhotoURL(url);
            handleAuthPhotoURL(url);
            setIsOpen(true);
            handleModal("success", "success to add an photo");
            // alert("success!");
          })
          .catch((error) => {
            console.log(error.message, "error!");
            handleModal("oops", error.message);
          });
      })
      .catch((error) => {
        console.log(error.message, "error");
        handleModal("oops", error.message);
      });
    setLoading(false);
  };

  const handleAuthPhotoURL = (url) => {
    setLoading(true);
    updateProfile(currentUser, { photoURL: url })
      .then(() => {
        // alert("success update!");
        setIsOpen(true);
        handleModal("success", "success to add an photo");
      })
      .catch((error) => {
        console.log(error.message, "error when update");
        handleModal("oops", error.message);
      });
    setLoading(false);
  };

  useEffect(() => {
    if (currentUser?.photoURL) {
      const newPicture = currentUser.photoURL;
      setPhotoURL(currentUser.photoURL);
      dispatch(update({ picture: newPicture }));
    }
  }, [photoURL]);

  let type;
  let msg;

  const handleModal = (typepassin, msgpassin) => {
    type = typepassin;
    msg = msgpassin;
    console.log("type & msg", type, msg);
  };

  console.log("type & msg", type, msg);

  return (
    <Wrapper>
      <div grid={"input"}>
        <label htmlFor="myfile"></label>
        <input
          type="file"
          id="myfile"
          name="myfile"
          onChange={(e) => handleChange(e)}
        ></input>
      </div>
      <button disabled={loading || !photo} onClick={handleClick}>
        Upload
      </button>
      <StyledAvatar src={photoURL} />
      {isOpen ? (
        <Modal type={type} msg={msg} setIsOpen={setIsOpen}></Modal>
      ) : (
        <></>
      )}
    </Wrapper>
  );
}
