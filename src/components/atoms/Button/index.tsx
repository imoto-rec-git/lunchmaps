import React from "react"
import "./index.css"
import { css } from "@emotion/react"

const storyBookButton = css`
  color: #f00;
`

interface ButtonProps {
  primary?: boolean
  backgroundColor?: string
  // size?: 'small' | 'medium' | 'large';
  size?: "medium"
  label: string
  onClick?: () => void
}

export const Button = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = primary
    ? "storybook-button--primary"
    : "storybook-button--secondary"
  return (
    <button
      type="button"
      css={storyBookButton}
      className={["storybook-button", `storybook-button--${size}`, mode].join(
        " "
      )}
      {...props}
    >
      {label}
      <style jsx>{`
        button {
          background-color: ${backgroundColor};
        }
      `}</style>
    </button>
  )
}
