import React, { useEffect } from "react";

export default function Elevation(location:string) {

  const makeAPICall = async () => {
    try {
      const response = await fetch('/api?' + new URLSearchParams({coord: location}))
      const data = await response.json();
      console.log({ data })
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    makeAPICall();
  }, [])
}