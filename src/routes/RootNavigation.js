import * as React from 'react';

export const isReadyRef = React.createRef();
export const navigationRef = React.createRef();

export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.navigate(name, params);
  } else {
    console.log("Navigation was not mounted");
  }
}

export function goBack() {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.goBack();
  } else {
    console.log("Navigation was not mounted");
  }
}

export function pop() {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.pop();
  } else {
    console.log("Navigation was not mounted");
  }
}