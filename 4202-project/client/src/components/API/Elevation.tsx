import React, { useEffect } from "react";

export default function Elevation(origin:string, destination:string) {

  const makeAPICall = async () => {
    try {
      const response = await fetch('/time?' + new URLSearchParams({origin: origin, destination:destination}))
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