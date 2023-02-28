import styles from "../styles/NftGallery.module.css";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function NFTGallery({
  walletAddress,
  collectionAddress,
  chain,
  pageSize,
}) {
  const [nfts, setNfts] = useState();
  const [isLoading, setIsloading] = useState(false);
  const { address, isConnected, isDisconnected } = useAccount();
  const [pageKey, setPageKey] = useState();
  const [excludeFilter, setExcludeFilter] = useState(true);

  const fetchNfts = () => {
    if (collectionAddress) {
      getNftsForCollection();
    } else if (walletAddress || address) {
      getNftsForOwner();
    }
  };
  const getNftsForOwner = async () => {
    setIsloading(true);
    if (isConnected || walletAddress) {
      try {
        const res = await fetch("/api/getNftsForOwner", {
          method: "POST",
          body: JSON.stringify({
            address: walletAddress ? walletAddress : address,
            pageSize: pageSize,
            chain: chain,
            pageKey: pageKey ? pageKey : null,
            excludeFilter: excludeFilter,
          }),
        }).then((res) => res.json());
        console.log(res);

        setNfts(res.nfts);
        if (res.pageKey) setPageKey(res.pageKey);
      } catch (e) {
        console.log(e);
      }
    }

    setIsloading(false);
  };

  const getNftsForCollection = async () => {
    setIsloading(true);

    if (collectionAddress) {
      try {
        const res = await fetch("/api/getNftsForCollection", {
          method: "POST",
          body: JSON.stringify({
            address: collectionAddress ? collectionAddress : address,
            pageSize: pageSize,
            chain: chain,
            pageKey: pageKey ? pageKey : null,
            excludeFilter: excludeFilter,
          }),
        }).then((res) => res.json());

        setNfts(res.nfts);
        if (res.pageKey) setPageKey(res.pageKey);
      } catch (e) {
        console.log(e);
      }
    }

    setIsloading(false);
  };

  useEffect(() => {
    fetchNfts();
  }, []);

  if (isDisconnected) return <p>Loading...</p>;

  return (
    <div className={styles.nft_gallery_page_container}>
      <div className={styles.nft_gallery}>
        <div className={styles.nfts_display}>
          {isLoading ? (
            <p>Loading...</p>
          ) : nfts?.length ? (
            nfts.map((nft) => {
              return <NftCard key={nft.tokenId} nft={nft} />;
            })
          ) : (
            <p>No NFTs found for the selected address</p>
          )}
        </div>
      </div>

      {pageKey && (
        <div className={styles.button_container}>
          <a
            className={styles.button_black}
            onClick={() => {
              fetchNFTs(pageKey);
            }}
          >
            Load more
          </a>
        </div>
      )}
    </div>
  );
}

function NftCard({ nft }) {
  return (
    <div className={styles.card_container}>
      <div className={styles.image_container}>
        <img src={nft.media}></img>
      </div>
      <div className={styles.info_container}>
        <div className={styles.title_container}>
          <h3>
            {nft.title.length > 20
              ? `${nft.title.substring(0, 15)}...`
              : nft.title}
          </h3>
        </div>
        <hr className={styles.separator} />
        <div className={styles.symbol_contract_container}>
          <div className={styles.symbol_container}>
            <p>
              {nft.collectionName && nft.collectionName.length > 20
                ? `${nft.collectionName.substring(0, 20)}`
                : nft.collectionName}
            </p>

            {nft.verified == "verified" ? (
              <img
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/2048px-Twitter_Verified_Badge.svg.png"
                }
                width="20px"
                height="20px"
              />
            ) : null}
          </div>
          <div className={styles.contract_container}>
            <p className={styles.contract_container}>
              {nft.contract.slice(0, 6)}...{nft.contract.slice(38)}
            </p>
            <img
              src={
                "https://etherscan.io/images/brandassets/etherscan-logo-circle.svg"
              }
              width="15px"
              height="15px"
            />
          </div>
        </div>

        <div className={styles.description_container}>
          <p>{nft.description}</p>
        </div>
      </div>
    </div>
  );
}