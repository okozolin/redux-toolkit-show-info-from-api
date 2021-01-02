import React, { useRef, useEffect, useState } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { Box } from "@material-ui/core";

export default function ArtistPicture({ imageUrl }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  const imgRef = useRef();
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setImgLoaded(true);
    }
  }, []);

  return (
    <>
      {imgLoaded ? null : <Skeleton variant="rect" width={200} height={200} />}
      <Box
        style={imgLoaded ? {} : { display: "none" }}
        component="img"
        ref={imgRef}
        src={imageUrl}
        width={{ xs: "200px", sm: "320px" }}
        onLoad={() => setImgLoaded(true)}
      />
    </>
  );
}
