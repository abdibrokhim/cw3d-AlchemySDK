import React from "react";
import NFTGallery from ".././components/NFTGallery";

const ProfilePage = () => {
  return (
    <>
      <NFTGallery walletAddress={"vitalik.eth"} chain={"ETH_MAINNET"} />
    </>
  );
};

export default ProfilePage;


