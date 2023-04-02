import React from "react"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"

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

export const Map = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        options={options}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  )
}
