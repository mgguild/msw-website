import React from 'react';
import styled from 'styled-components';
import { Button, IconButton } from '@metagg/mgg-uikit';
import useMarketplaceV2 from '../../../../hooks/useMarketplaceV2';
import BuyExtended from './Buy-token_extend';
import { H1, TextWrapper, H3 } from '../Foundation/Text';
import { ModalSection } from './styled';
import { MiniBox } from '../Foundation/Box';
import ModalComponent from './Modal';

const BuyModal: React.FC<any> = props => {
    const [option, setOption] = React.useState<string | null>(null);
    const token1 = 'USDT-BEP20';
    const token2 = 'USDT-ERC20';
    const { controllers } = useMarketplaceV2();
    const { modal } = controllers;

    const handleOption = (e: any) => {
        e.preventDefault();
        setOption(e.target.name);
    };

    React.useEffect(() => {
        return setOption(null);
    }, []);

    const renderMain = () => (
        <>
            <TextWrapper align="center">
                <H1>PAYMENT METHOD</H1>
            </TextWrapper>
            <DivActions className="payment-options">
                <Button
                    onClick={handleOption}
                    name="credit_card"
                    className="payment-option"
                >
                    CREDIT CARD
                </Button>
                <Button
                    onClick={handleOption}
                    name={`crpyto_${token1}`}
                    className="payment-option"
                >
                    Crypto USDT (BEP-20)
                </Button>
                <Button
                    onClick={handleOption}
                    name={`crpyto_${token2}`}
                    className="payment-option"
                >
                    Crypto USDT (ERC-20)
                </Button>
            </DivActions>
            <DivActions>
                <MiniBox style={{ height: '40px', padding: '15px' }}>
                    <Button
                        className="icon-button with-animation-enlarge"
                        variant="text"
                        margin="0 auto"
                        padding="0"
                        onClick={() => modal.handleClose('buy-token')}
                    >
                        <H3>Okay</H3>
                    </Button>
                </MiniBox>
            </DivActions>
        </>
    );

    return (
        <ModalComponent type="buy-token">
            <ModalSection>
                {!option ? (
                    renderMain()
                ) : (
                    <BuyExtended returnFn={{ option, setOption }} />
                )}
            </ModalSection>
        </ModalComponent>
    );
};

export default BuyModal;

export const DivActions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &.payment-options {
        margin: 10px 0;
        padding: 10px 0;
    }
    & > button.payment-option {
        width: 100%;
        height: 40px;
        margin: 5px 0;
    }
`;
