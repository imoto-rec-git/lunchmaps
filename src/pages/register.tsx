import React from 'react';
import Head from 'next/head';
import { css } from '@emotion/react';
import Link from 'next/link';
import Image from 'next/image';
import { HeadTitle } from '@/components/molecules/HeadTitle';

export default function login() {
  return (
    <>
      <Head>
        <title>ログイン | Lunch Maps</title>
        <meta name="description" content="Lunch Mapsのログイン画面" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeadTitle link={'./login'} title={'ログイン'} />
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
              <Link href="/" css={passwordForget}>
                パスワードをお忘れの方
              </Link>
              <button type="submit" css={botton}>
                ログイン
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

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
    border-radius: 8px;
    width: 100%;
    padding: 10px 12px;
    margin: 0 0 24px;
    color: #333;
    font-size: var(--font-size-medium);
    &::placeholder {
      color: #ccc;
    }
  }
`;

const passwordForget = css`
  text-decoration: underline;
  display: block;
  text-align: right;
  font-size: var(--font-size-small);
  margin: 0 0 40px;
`;

const botton = css`
  border: none;
  border-radius: 60px;
  background: var(--color-dark-orange);
  font-size: var(--font-size-small);
  padding: 19px 37px;
  line-height: 1;
  margin: auto;
  display: block;
`;
