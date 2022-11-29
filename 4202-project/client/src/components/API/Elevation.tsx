import React, { useState, useEffect } from "react";

export const Elevation:any = async(origin:string, destination:string) =>{
  let currentTime = 0
  
  await fetch('/time?' + new URLSearchParams({origin: origin, destination:destination})).then(res => res.json()).then(data => {
    currentTime = data
  });
  
  return currentTime
}