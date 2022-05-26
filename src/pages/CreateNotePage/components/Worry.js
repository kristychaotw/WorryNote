import React, { useState } from "react";
import { TextAreaBox } from "../../../components/styles/note.css";

export default function Worry(props) {
  const [worry, setWorry] = useState();

  return (
    <>
      <TextAreaBox
       grid={"content"}
        name="worry"
        // onChange={(e) => setWorry(e.target.value)}
        onChange={(e) => props.newWorry(e.target.value)}
        placeholder="Write down your worry"
        rows={5}
      ></TextAreaBox>
      {/* <p>your worry:{worry}</p> */}
    </>
  );
}
