import React from 'react'
import { css } from '@emotion/react'

export const PassWord = ({
  isGoogleSignIn,
  settingWrapper,
  settingTitle,
  settingContent,
  settingChange,
}) => {
  return (
    <>
      {!isGoogleSignIn && (
        <>
          <div css={settingWrapper}>
            <p css={settingTitle}>パスワード</p>
            <p css={settingContent}>●●●●●●●●●</p>
            <p css={settingChange}>変更</p>
          </div>

          <div css={memberDelWrapper}>
            <p>会員情報削除</p>
          </div>
        </>
      )}
    </>
  )
}

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
`
