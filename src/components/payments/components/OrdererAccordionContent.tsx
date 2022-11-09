import React, { useEffect, useRef, useState } from "react";
import {
  useComponentRefContext,
  useInputValuesContext,
  useSetInputValuesContext,
} from "../context";
import { AccordionContentContainer } from "../styledConsts";
import AnimationTextForm from "./AnimationTextForm";

const OrdererAccordionContent = () => {
  const componentRef = useComponentRefContext();
  const inputValues = useInputValuesContext();
  const setInputValues = useSetInputValuesContext();

  return (
    <AccordionContentContainer>
      <AnimationTextForm
        placeholder="이름"
        refId={0}
        componentRef={componentRef}
        inputValues={inputValues}
        setInputValues={setInputValues}
        autoFocusNext={true}
      />
      <AnimationTextForm
        placeholder="연락처"
        refId={1}
        componentRef={componentRef}
        inputValues={inputValues}
        setInputValues={setInputValues}
      />
    </AccordionContentContainer>
  );
};

export default OrdererAccordionContent;
