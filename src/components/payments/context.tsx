import React, { useContext } from "react";

export const UserInfoContext = React.createContext({});
export const useUserInfoContext = () => {
  return useContext(UserInfoContext);
};
export const SetUserInfoContext = React.createContext(() => {});
export const useSetUserInfoContext = () => {
  return useContext(SetUserInfoContext);
};
export const InputValuesContext = React.createContext([]);
export const useInputValuesContext = () => {
  return useContext(InputValuesContext);
};
export const SetInputValuesContext = React.createContext(() => {});
export const useSetInputValuesContext = () => {
  return useContext(SetInputValuesContext);
};
export const ComponentRefContext = React.createContext([]);
export const useComponentRefContext = () => {
  return useContext(ComponentRefContext);
};

export const OrderInfoContext = React.createContext({});
export const useOrderInfoContext = () => {
  return useContext(OrderInfoContext);
};
export const SetOrderInfoContext = React.createContext(() => {});
export const useSetOrderInfoContext = () => {
  return useContext(SetOrderInfoContext);
};
