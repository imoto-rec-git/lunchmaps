import { CSSProperties, SerializedStyles } from '@emotion/serialize'
import React from 'react'

interface MailProps {
  settingWrapper: SerializedStyles
  settingTitle: SerializedStyles
  settingContent: SerializedStyles
  userEmail: string
  isGoogleSignIn: boolean
  settingChange: SerializedStyles
}

export const Mail = ({
  settingWrapper,
  settingTitle,
  settingContent,
  userEmail,
  isGoogleSignIn,
  settingChange,
}: MailProps) => {
  return (
    <div css={settingWrapper}>
      <p css={settingTitle}>メールアドレス</p>
      <p css={settingContent}>{userEmail}</p>
      {!isGoogleSignIn && <p css={settingChange}>変更</p>}
    </div>
  )
}
