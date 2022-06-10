import * as s from '../styles/globalStyles'
import styled from 'styled-components';
import Address from './Address';
import { useEffect, useState } from 'react';
import Loader from './Loader';
import { getEvents } from '../util/events';

const BoarderWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const LeaderBoard = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [topAddresses, setAddresses] = useState([]);

    useEffect(() => {
        const controller = new AbortController();

        const fetchHolders = async () => {
            try {
                setIsLoading(true);
                const res = await getEvents();
                setAddresses(res);
                setIsLoading(false);
            } catch (error) {
                console.log(error)
                setIsLoading(false);
            }
        }
        fetchHolders();
        return () => {
            controller.abort();
          };
    }, []);

    const Holders = () => {
        return (
            <s.Screen style={{ backgroundColor: "#f7f9fb" }}>
                <s.TextTitle>
                    Top 10 Ownerships
                </s.TextTitle>
                <s.SpacerMedium />
                <BoarderWrapper style={{ backgroundColor: "#f7f9fb" }}>
                    {topAddresses?.length === 0 ? (
                        <s.TextTitle>
                            Found no NFTs!
                        </s.TextTitle>
                    ) : (
                        topAddresses?.slice(0, 10).map((addr, index) => (<Address key={index} { ...addr } />)
                    ))}
                </BoarderWrapper>
                <s.SpacerLarge />
            </s.Screen>
        )
    }

    return (
        <>
            {isLoading ? <Loader /> : <Holders />}
        </>
    )
}

export default LeaderBoard
