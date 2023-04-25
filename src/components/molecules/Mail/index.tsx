import React from 'react'

export const Mail = ({
  settingWrapper,
  settingTitle,
  settingContent,
  userEmail,
  isGoogleSignIn,
  settingChange,
}) => {
  return (
    <div css={settingWrapper}>
      <p css={settingTitle}>メールアドレス</p>
      <p css={settingContent}>{userEmail}</p>
      {!isGoogleSignIn && <p css={settingChange}>変更</p>}
    </div>
  )
}
