import React, { PropsWithChildren } from "react";
import { FaFacebook } from "react-icons/fa6";
function FacebookIcon(props: { size: number; color: string }) {
  return <FaFacebook size={props.size} color={props.color} />;
}

export default FacebookIcon;
