import React, { useContext } from "react";
import Tags from "./Tags";
import StressRating from "./StressRating";
import NoteTitle from "./NoteTitle";
import Worry from "./Worry";
import Stamp from "./Stamp";
import {
  TitleLable,
  FormWrapper,
  StampWrapper,
} from "../../../components/styles/note.css";
import { useDispatch, useSelector } from "react-redux";
import { updateNote, saveNote, failtoSaveNote } from "../../../reducers/form";

import { AuthContext } from "../../../firebase";

export default function Form() {
  
  const currentUser = useContext(AuthContext).currentUser.uid;
  
  const dispatch = useDispatch();
  const formContent = useSelector((state) => state.form.value);
  console.log("formContent:", formContent);

  return (
    <>
      <FormWrapper
      onLoad={()=>dispatch(updateNote({author:currentUser}))}>
        <StampWrapper top={"90px"} right={"-35px"}>
          <Stamp/>
        </StampWrapper>
        <TitleLable grid={"trate"}>Rate your stress</TitleLable>
        <StressRating
          grid={"rate"}
          newRate={(value) => dispatch(updateNote({ stressRating: value }))}
        ></StressRating>
        <TitleLable grid={"ttitle"}>Title</TitleLable>
        <NoteTitle
          newKeyword={(value) => dispatch(updateNote({ keyword: value }))}
        />
        <TitleLable grid={"ttag"}>Tags</TitleLable>
        <Tags newTag={(value) => dispatch(updateNote({ tag: value }))} />
        <TitleLable grid={"tcontent"}>Content</TitleLable>
        <Worry newWorry={(value) => dispatch(updateNote({ worry: value }))} />
      </FormWrapper>
    </>
  );
}