import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { css } from '@emotion/react';

export const HeadTitle = ({ link, title }) => {
  return (
    <>
      <div css={headTitle}>
        <Link href={link}>
          <Image src="./images/arrow.svg" width={12} height={20} alt="戻る" />
        </Link>
        <p>{title}</p>
      </div>
    </>
  );
};

const headTitle = css`
  align-items: center;
  background: var(--color-white);
  height: 50px;
  border-bottom: 1px solid #ddd;
  position: relative;
  a {
    position: absolute;
    top: 0;
    left: 10px;
    bottom: 0;
    margin: auto;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: var(--color-dark-orange);
    border: none;
    img {
      margin: 4px 8px;
    }
  }
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-weight: var(--font-weight-medium);
  }
`;
