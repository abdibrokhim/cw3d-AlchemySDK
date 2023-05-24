// require('dotenv').config();
import React from "react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import colors from '../colors';

import { Network, Alchemy } from "alchemy-sdk";

const ProfilePage = () => {
  const settings = {
    apiKey: "",
    network: Network.ETH_GOERLI,
  };

  const alchemy = new Alchemy(settings);

  const [nfts, setNfts] = React.useState([]);

  const GetNFTs = async () => {

    const address = "";

    const nftsForOwner = await alchemy.nft.getNftsForOwner(address);
    console.log("number of NFTs found:", nftsForOwner.totalCount);
    console.log("...");

    console.log('nftsForOwner:\n', nftsForOwner)

    setNfts(nftsForOwner.ownedNfts)
  };

  React.useEffect(() => {
    GetNFTs();
  }, []);

  const NftWrapper = ({ children }) => {
    return (
      <div 
        className=''
        style={{
          backgroundColor: colors.content_bg_dark,
          padding: '10px',
          borderRadius: '5px',
        }}
        >
          {children}
      </div>
    )
  }

  return (
    <>
      <Container>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {nfts.map((nft, key) => (
            <Grid item sm={3} xs={12} key={key}>
                <NftWrapper>
                  <img 
                    src={`${nft.contract.openSea.imageUrl}?w=164&h=164&fit=crop&auto=format`}
                    alt={nft.contract.name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        borderRadius: '5px',
                    }}
                  />
                  <div
                    className=''
                    style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        width: '100%',
                        padding: '10px',
                        marginTop: '20px',
                        borderRadius: '5px',
                        backgroundColor: colors.button_bg_primary,
                        color: colors.const_dark_text,
                    }}
                  >
                    {nft.contract.name}
                </div>
              </NftWrapper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default ProfilePage;
