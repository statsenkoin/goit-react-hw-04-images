import React from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, Content } from './Loader.styled';

import { RotatingLines } from 'react-loader-spinner';

const loader = document.querySelector('#loader');

export function Loader() {
  return createPortal(
    <Backdrop>
      <Content>
        {/* <p>Loading...</p> */}
        <RotatingLines
          strokeColor="tomato"
          strokeWidth="5"
          animationDuration="1"
          width="140"
          visible={true}
        />
      </Content>
    </Backdrop>,
    loader
  );
}
