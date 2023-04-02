import React, { useRef, useState, useEffect } from "react"
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api"

const containerStyle = {
  width: "100%",
  height: "calc(100svh - 70px)",
}
const center = {
  lat: 34.69299270474642,
  lng: 135.49621535648794,
}

const zoom = 16

const options = {
  disableDefaultUI: true,
}

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""

export const Map = () => {
  const ref = useRef(null)
  const [map, setMap] = useState(null)

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}))
    }
  }, [ref, map])

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        options={options}
      >
        <MarkerF position={center} />
        <MarkerF
          position={{ lat: 34.691887536837314, lng: 135.4960153718098 }}
          icon="./images/good.svg"
        />
        <MarkerF
          position={{ lat: 34.69246393348951, lng: 135.4953224999098 }}
          icon="./images/reasonable.svg"
        />
        <MarkerF
          position={{ lat: 34.69493032966753, lng: 135.49545292283742 }}
          icon="./images/normal.svg"
        />
        <MarkerF
          position={{ lat: 34.692118357488425, lng: 135.4950264711962 }}
          icon="./images/recommend.svg"
        />
      </GoogleMap>
    </LoadScript>
  )
}
