import React from 'react';
import Head from 'next/head';
import { css } from '@emotion/react';
import Link from 'next/link';
import Image from 'next/image';

export default function login() {
  return (
    <>
      <Head>
        <title>ログイン | Lunch Maps</title>
        <meta name="description" content="Lunch Mapsのログイン画面" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div css={headLine}>
        <button>
          <Image src="./images/arrow.svg" width={12} height={20} alt="" />
        </button>
        <p>ログイン</p>
      </div>
      <main>
        <section>
          <div css={Container}>
            <p>以下の項目を入力し、「ログイン」ボタンを押してください。</p>
            <form>
              <label htmlFor="mail">メールアドレス</label>
              <input
                type="text"
                id="mail"
                placeholder="yamada-taro@sample.co.jp"
              />
              <label htmlFor="mail">パスワード</label>
              <input type="password" id="password" />
              <Link href="/">パスワードをお忘れの方</Link>
              <button type="submit">ログイン</button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

const headLine = css`
  align-items: center;
  background: var(--color-white);
  height: 46px;
  border-bottom: 1px solid #ddd;
  position: relative;
  button {
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
      margin: 0 8px;
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

const Container = css`
  height: 100vh;
  background: #ff9042;
  position: relative;
  padding: 16px;
  color: var(--color-white);
  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-medium);
  > p {
    line-height: 18px;
    margin: 0 0 18px;
  }
  label {
    font-size: var(--font-size-small);
    display: block;
    margin: 0 0 4px;
  }
  input {
    border: 1px solid #f5f5f5;
    border-radius: 14px;
    width: 100%;
    padding: 8px 0;
  }
`;
