import React from 'react';
import Head from 'next/head';
import { Navigation } from '@/components/organisms/Navigation';
import { HeadTitle } from '@/components/molecules/HeadTitle';
import { css } from '@emotion/react';

export default function setting() {
  return (
    <>
      <Head>
        <title>設定 | Lunch Maps</title>
        <meta name="description" content="Lunch Mapsの設定画面" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HeadTitle link={'./'} title={'設定'} />
        <div css={conatiner}>
          <div css={settingWrapper}>
            <p css={settingTitle}>メールアドレス</p>
            <p css={settingContent}>yamada.taro@gmail.com</p>
            <p css={settingChange}>変更</p>
          </div>
          <div css={settingWrapper}>
            <p css={settingTitle}>パスワード</p>
            <p css={settingContent}>●●●●●●●●●</p>
            <p css={settingChange}>変更</p>
          </div>
          <div css={memberDelWrapper}>
            <p>会員情報削除</p>
          </div>
        </div>
        <Navigation />
      </main>
    </>
  );
}

const conatiner = css`
  min-height: calc(100vh - 120px);
  background: var(--color-dark-white);
  padding: 14px 0;
  position: relative;
  > p {
    font-size: var(--font-size-medium);
    font-weight: var(--font-weight-regular);
    text-align: center;
    margin: 0 0 8px;
  }
`;

const settingWrapper = css`
  width: 100%;
  padding: 16px 14px;
  background: var(--color-white);
  display: flex;
  align-items: center;
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-regular);
  color: #999;
  border-top: 1px solid var(--color-light-gray);
  border-bottom: 1px solid var(--color-light-gray);
  &:nth-child(n + 2) {
    margin: -1px 0 0;
  }
`;
const settingTitle = css`
  width: 84px;
  margin: 0 12px 0 0;
`;
const settingContent = css`
  font-size: var(--font-size-medium);
  color: #333;
`;
const settingChange = css`
  margin: 0 0 0 auto;
`;
const memberDelWrapper = css`
  width: 100%;
  padding: 16px 14px;
  background: var(--color-white);
  display: flex;
  align-items: center;
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-regular);
  color: #999;
  border-top: 1px solid var(--color-light-gray);
  border-bottom: 1px solid var(--color-light-gray);
  position: absolute;
  bottom: 14px;
  > p {
    font-weight: var(--font-weight-bold);
    color: #ff4936;
    margin: auto;
  }
`;
