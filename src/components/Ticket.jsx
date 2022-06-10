import * as s from '../styles/globalStyles';
import { QrWrapper } from './Address';
import QRCode from 'qrcode'
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { signTicket } from '../util/signature';
import { StyledButton } from './Home';

const Ticket = () => {
    const [imgSrc, setImgSrc] = useState('');

    const myAddress = useSelector((state) => state.blockchain.account);
    const nftName = useSelector((state) => state.data.nftName);

    const sign = async () => {
     const signature = await signTicket(myAddress, nftName);
     const dataUrl = await QRCode.toDataURL(`${window.location.origin}/Gallery/${signature}`);
     setImgSrc(dataUrl);  
    }

    useEffect(() => {
        const controller = new AbortController();

        if (myAddress && nftName) {
            setImgSrc('')
        }

        return () => {
            controller.abort();
        }
    }, [myAddress]);

    return (
        <s.Screen style={{ 
            backgroundColor: "#f7f9fb", 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' }}
            >
            {myAddress ? (
                <>
                    {!imgSrc ? (
                        <StyledButton
                        onClick={sign}
                        >
                            Sign Ticket
                            </StyledButton>
                    ) : (
                        <QrWrapper>
                            <img src={imgSrc} />
                        </QrWrapper>
                    )}
                </>
            ) : (
                <s.TextTitle style={{
                    color: 'red',
                    border: '1px solid',
                    padding: 5
                }}>
                    PLease connect Wallet!
                </s.TextTitle>
            )}
        </s.Screen>
    )
}

export default Ticket;
