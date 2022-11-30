import React, { useState, useEffect } from "react";

export const Elevation:any = async(origin:string, destination:string) =>{
  let currPath:any = []
  
  await fetch('/path?' + new URLSearchParams({origin: origin, destination:destination})).then(res => res.json()).then(data => {
    currPath = data.path
    console.log(currPath);
  });
  
  return currPath
}