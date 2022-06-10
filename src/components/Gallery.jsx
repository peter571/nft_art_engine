import * as s from "../styles/globalStyles";
import styled from 'styled-components';
import NFTCard from "./NftCard";
import { shortenAddress } from "../util";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkIfWalletIsConnect } from "../redux/blockchain/blockchainActions";
import { getNftTokens } from "../api";
import { useState } from "react";
import Loader from "./Loader";

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  width: 100%;
  
`;

const Gallery = () => {
    const blockchain = useSelector((state) => state.blockchain);
    const { account } = blockchain;
    const dispatch = useDispatch();
    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        dispatch(checkIfWalletIsConnect());

        controller.abort();
    }, []);

    useEffect(() => {
        const getAssets = async () => {
            try {
                setLoading(true);
                if (account) {
                    const assets = await getNftTokens(account);
                    setNfts(assets);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }
        getAssets();
    }, [account]);

    const GalleryAssets = () => {
        return (
            <s.Screen style={{ backgroundColor: "#f7f9fb" }}>
                <s.TextTitle>
                    {account && shortenAddress(account)}
                </s.TextTitle>
                <s.TextDescription>
                    Found {nfts.length} NFTS..
                </s.TextDescription>
                <s.Container
                    flex={1}
                    ai={"center"}
                    style={{ paddingTop: 24, backgroundColor: "#f7f9fb" }}
                >
                    <ResponsiveWrapper>
                        {nfts.length === 0 ? (
                            <p>No NFTs found!</p>
                        ) : (
                            nfts.map((nft) => (
                                <NFTCard key={nft.id} {...nft} />
                            ))
                        )}
                    </ResponsiveWrapper>
                </s.Container>
            </s.Screen>
        )
    }

    return (
        <>
            {loading ? <Loader /> : <GalleryAssets />}
        </>
    )
}

export default Gallery;
