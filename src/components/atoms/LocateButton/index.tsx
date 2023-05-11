import { css } from '@emotion/react'
import Image from 'next/image'
import { useLocationSearch } from '@/hooks/useLocationSearch'
import { Dispatch, SetStateAction } from 'react'

interface LocateButtonProps {
  setLat: Dispatch<SetStateAction<number>>
  setLng: Dispatch<SetStateAction<number>>
}

export const LocateButton = ({ setLat, setLng }: LocateButtonProps) => {
  const { handleCurrentLocationClick } = useLocationSearch({ setLat, setLng })
  return (
    <>
      <div css={LocationStyle} onClick={handleCurrentLocationClick}>
        <Image src="./images/location.svg" width={28} height={36} alt="" />
        <p>現在地</p>
      </div>
    </>
  )
}

const LocationStyle = css`
  color: var(--color-white);
  width: 65px;
  height: 65px;
  position: absolute;
  bottom: 144px;
  right: 20px;
  border-radius: 50%;
  background: var(--color-dark-orange);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  img {
    margin: 0 auto 4px;
  }
  p {
    font-size: 10px;
    text-align: center;
  }
`
