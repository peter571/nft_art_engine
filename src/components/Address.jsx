import styled from "styled-components";
import * as s from '../styles/globalStyles';
import { useSelector } from "react-redux";
import { shortenAddress } from "../util";
import { useState, useEffect } from "react";
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

const AddressWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    border-left: 5px;
    border-style: solid;
    margin: 10px 0;
    padding: 3px 5px;
    width: 70%;
    background-color: #dbd7d7;
    transition: background-color 0.3s;

    &:hover {
        background-color: #cfcaca;
    }

    @media only screen and (max-width:  1024px) {
        width: 80%;
    }

    @media only screen and (max-width:  768px) {
        width: 100%;
    }

`;

const DivWrapper = styled.div`
    width: 50%;

    @media only screen and (max-width: 768px) {
        width: 50%;
    }
`;

export const QrWrapper = styled.div`
    margin: 0 5px;
`

const Address = ({ address, pieces_owned, ens_name }) => {
    const myAddress = useSelector((state) => state.blockchain.account);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    return (
        <AddressWrapper style={{
            borderColor: myAddress?.toLowerCase() === address.toLowerCase() ? 'blue' : 'black',
        }}>
            <DivWrapper>
                <s.TextTitle
                    style={{
                        color: myAddress?.toLowerCase() === address.toLowerCase() ? 'blue' : 'black',
                        borderColor: myAddress?.toLowerCase() === address.toLowerCase() ? 'blue' : 'black',
                    }}>
                    {width > 900 ? address : shortenAddress(address)}
                </s.TextTitle>
                <s.TextTitle
                    style={{ fontSize: 18, color: myAddress?.toLowerCase() === address.toLowerCase() ? 'blue' : 'black' }}>
                    {ens_name ? ens_name : "No ens_name"}
                </s.TextTitle>
                <s.TextTitle
                    style={{ fontSize: 18, color: myAddress?.toLowerCase() === address.toLowerCase() ? 'blue' : 'black' }}>
                    Pieces Owned: {pieces_owned}
                </s.TextTitle>
            </DivWrapper>
            <QrWrapper>
                <Jazzicon diameter={35} seed={jsNumberForAddress(address)} />
            </QrWrapper>
        </AddressWrapper>
    )
}

export default Address;
