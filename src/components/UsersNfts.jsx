import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNftTokens } from '../api';
import * as s from '../styles/globalStyles';
import { ResponsiveWrapper } from './Gallery';
import { shortenAddress } from '../util';
import NFTCard from './NftCard';
import Loader from './Loader';
import { recoverAddress } from '../util/signature';

const UsersNfts = () => {
    const [usersNFTs, setUsersNFTs] = useState([]);
    const { signature } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [addr, setAddr] = useState('');

    useEffect(() => {
        const fetchNfts = async () => {
            try {
                setIsLoading(true);
                const address = await recoverAddress(signature);
                setAddr(address);
                const assets = await getNftTokens(address);
                setUsersNFTs([...assets]);
                setIsLoading(false);

            } catch (err) {
                console.error(err);
                setIsLoading(false);
            }
        };
        fetchNfts();

    }, []);

    const Nfts = () => {
        return (
            <s.Screen style={{ backgroundColor: "#f7f9fb" }}>
            <s.TextTitle>
                {addr && shortenAddress(addr)}
            </s.TextTitle>
            <s.TextDescription>
                Has {usersNFTs.length} NFTS
            </s.TextDescription>
            <s.Container
                flex={1}
                ai={"center"}
                style={{ paddingTop: 24, backgroundColor: "#f7f9fb" }}
            //image={"/config/images/bg.png"}
            >
                <ResponsiveWrapper>
                    {usersNFTs.length === 0 ? (
                        <p>No NFTs found!</p>
                    ) : (
                        usersNFTs.map((nft) => (
                            <NFTCard {...nft} />
                        ))
                    )}
                </ResponsiveWrapper>
            </s.Container>
        </s.Screen>
        )
    }

    return (
        <>
        {isLoading ? <Loader /> : <Nfts />}
        </>
    )
}

export default UsersNfts;
