import React from 'react';
import { Grid } from '@mui/material';
import styled from 'styled-components';
import useTheme from '../../../../hooks/useTheme';
import { Button, Flex, IconButton } from '@metagg/mgg-uikit';
import { FaChevronCircleLeft } from 'react-icons/fa';
import { H1, H3, P, P as Text, TextWrapper } from '../Foundation/Text';
import { ConfirmComponent } from './Modal';
import { CONFIRM_TYPE } from './index.d';
import Dropdown from '../Foundation/Dropdown';

type Props = {
    returnFn: {
        option: string | null;
        setOption: React.Dispatch<React.SetStateAction<string | null>>;
    };
};

const BuyExtended: React.FC<Props> = props => {
    const { theme } = useTheme();
    const { returnFn } = props;
    const [buySuccess, setBuySuccess] = React.useState<boolean>(false);
    const handleBuy = () => {
        setBuySuccess(true);
    };
    const renderFields = () => (
        <Fields container>
            <Field container item xs={12}>
                <Label item xs={4} container>
                    <Grid item xs={10}>
                        <Text>Quantity</Text>
                    </Grid>
                    <Grid item xs={2}>
                        <Text>:</Text>
                    </Grid>
                </Label>
                <Grid item xs={4} md={2}>
                    <Dropdown filters={qtySample} />
                </Grid>
            </Field>
            <Field container item xs={12}>
                <Label item xs={4} container>
                    <Grid item xs={10}>
                        <Text>Amount</Text>
                    </Grid>
                    <Grid item xs={2}>
                        <Text>:</Text>
                    </Grid>
                </Label>
                <Grid item xs={8}>
                    <Value>$0.00</Value>
                </Grid>
            </Field>
            <Field container item xs={12}>
                <Label item xs={4} container>
                    <Grid item xs={10}>
                        <Text>Transfer Address</Text>
                    </Grid>
                    <Grid item xs={2}>
                        <Text>:</Text>
                    </Grid>
                </Label>
                <Grid item xs={8}>
                    <Value>ETC Chain ( ERC-20 )</Value>
                </Grid>
            </Field>
            <Field container item xs={12}>
                <Label item xs={4} container>
                    <Grid item xs={10}>
                        <Text>Transfer Currency</Text>
                    </Grid>
                    <Grid item xs={2}>
                        <Text>:</Text>
                    </Grid>
                </Label>
                <Grid item xs={8}>
                    <Value>USDT</Value>
                </Grid>
            </Field>
            <Field container item xs={12}>
                <Label item xs={4} container>
                    <Grid item xs={10}>
                        <Text>Token Consumed</Text>
                    </Grid>
                    <Grid item xs={2}>
                        <Text>:</Text>
                    </Grid>
                </Label>
                <Grid item xs={8}>
                    <Value>0.00 USDT</Value>
                </Grid>
            </Field>
            <Field container item xs={12}>
                <Label item xs={4} container>
                    <Grid item xs={10}>
                        <Text>Transfer Address</Text>
                    </Grid>
                    <Grid item xs={2}>
                        <Text>:</Text>
                    </Grid>
                </Label>
                <Grid item xs={8}>
                    <Value>0xD1d6bF74282782B0b3eb1413c901D6eCF02e8e28</Value>
                </Grid>
            </Field>
        </Fields>
    );

    const confirmData = {
        type: CONFIRM_TYPE.success,
        icon: 'CheckCircle',
        description: `Your crpyto currency remittance instruction has been completed. The remittance time varies depending on
    network conditions, so it may take a few minutes to several tens of minutes to confirm receipt of payment.`,
    };

    const renderBuySuccess = () => <ConfirmComponent {...confirmData} />;

    return (
        <StyledDiv>
            <TextWrapper>
                {!buySuccess ? (
                    <>
                        <Flex alignItems="center" justifyContent="center">
                            <IconButton
                                onClick={() => returnFn.setOption(null)}
                                variant="text"
                                className="icon-button"
                            >
                                <FaChevronCircleLeft />
                            </IconButton>

                            <H3 fsize="1.2em">BUY MARKET MONEY</H3>
                        </Flex>
                        {renderFields()}
                        <Flex justifyContent="center">
                            <Button
                                type="button"
                                onClick={handleBuy}
                                style={{ height: '30px' }}
                            >
                                BUY
                            </Button>
                        </Flex>
                    </>
                ) : (
                    renderBuySuccess()
                )}
            </TextWrapper>
        </StyledDiv>
    );
};

export default BuyExtended;

const qtySample = ['0.00', '10.00', '100.00', '300.00', '500.00', '1,000.00'];

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
`;
const Fields = styled(Grid)`
    margin: 10px 0px;
    padding: 10px 0px;
`;
const Label = styled(Grid)`
    align-items: center;
`;
const Field = styled(Grid)`
    padding: 10px 0px;
`;
const Value = styled(Text)`
    overflow-wrap: break-word;
`;
