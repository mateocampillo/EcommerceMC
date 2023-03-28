import React from 'react';

interface propList{
  title: string;
  image: string
}

export default function CardComponent(props:propList) {

  return (
    <>
      <h4>{props.title}</h4>
    </>
  )

}
