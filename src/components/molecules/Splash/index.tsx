import React, { useState } from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';

export const Splash = () => {
  const [active, setActive] = useState('');
  // setTimeout(() => {
  //   setActive("action")
  // }, 3000)
  return (
    <>
      <section>
        <div css={splashContainer} className={active}>
          <p>
            <Image
              src="./images/logo.svg"
              width={72}
              height={74}
              alt="LunchMaps"
            />
          </p>
        </div>
      </section>
    </>
  );
};

const splashContainer = css`
  background: var(--color-orange);
  height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  display: none;
`;
