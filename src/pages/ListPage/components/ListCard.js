import React from "react";
import {
  StyledCardWrapper,
  StyledCard,
  TagBox,
  RateBox,
  H3title,
  PStyled,
} from "../../../components/styles/component.css";
import StaticRating from "./StaticRating";
import { Link } from "react-router-dom";
import moment from "moment";

export default function ListCard({
  note: { id, title, rating, createDate, tag, animal, docID, endDate },
}) {
  let createDateFormat;
  if (createDate) {
    createDateFormat = moment(createDate).format("MMM Do YY");
  }

  let endDateFormat;
  if (endDate) {
    endDateFormat = moment(endDate).format("MMM Do YY");
  }

  function handleClick(e) {
    localStorage.setItem("showItemID", e);
  }

  return (
    <StyledCardWrapper onClick={() => handleClick(docID)}>
      <Link to="/note">
        <StyledCard>
          <H3title grid={"gtitle"}>{title}</H3title>
          <TagBox grid={"gtag"}>
            {tag}
          </TagBox>
          <img src={animal}></img>
          <PStyled grid={"gtime"}>
            {createDateFormat} {"  >>>  "} {endDateFormat}
          </PStyled>
          <RateBox grid={"grate"}>
            <StaticRating rate={rating}></StaticRating>
          </RateBox>
        </StyledCard>
      </Link>
    </StyledCardWrapper>
  );
}
