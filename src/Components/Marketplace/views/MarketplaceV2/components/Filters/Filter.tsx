import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Button, Flex } from '@metagg/mgg-uikit';
import useMarketplaceV2 from '../../../../hooks/useMarketplaceV2';
// import useMarketplaceV2Data from '../../../../hooks/useMarketplaceV2Data'
import useTheme from '../../../../hooks/useTheme';
import Drawer from '../Foundation/Drawer';
import { P, TextWrapper } from '../Foundation/Text';
import Iconloader from '../Foundation/Iconloader';
import Accordion from '../Foundation/Accordion';
import Option from './Option';
import './filter.css';

const Filter = () => {
    const { theme } = useTheme();
    const [selected, setSelected] = useState([]);

    // const {
    //   data: { classes },
    // } = useMarketplaceV2Data()

    const {
        badges,
        controllers: {
            drawer: { stateAnchor, toggleDrawer },
        },
    } = useMarketplaceV2();

    const handleClearSelect = () => setSelected([]);
    const handleSelect = (filterName: never) => {
        if (selected.includes(filterName)) {
            setSelected((prevSelected: any) =>
                prevSelected.filter((s: any) => s !== filterName),
            );
        } else {
            setSelected(prevSelected => [...prevSelected, filterName]);
        }
    };

    const renderSortClasses = () => {
        return (
            <Grid container spacing={{ xs: 1 }} pt={2} pb={2}>
                {/* {classes.map((cl: never) => (
          <Grid key={cl} item xs={12} lg={6}>
            <button
              onClick={() => handleSelect(cl)}
              type="button"
              style={{ width: '100%' }}
              className={`filter-btn ${selected.includes(cl) && 'selected'}`}
            >
              <Option name={cl} />
            </button>
          </Grid>
        ))} */}
            </Grid>
        );
    };

    const renderSortRarity = () => {
        return <h1>To be added...</h1>;
    };
    const renderSortCombatType = () => {
        return <h1>To be added...</h1>;
    };

    const renderContent = ({ content, type }: { content: JSX.Element; type: string }) => (
        <Accordion name={type}>{content}</Accordion>
    );

    return (
        <Drawer
            anchor="right"
            openState={stateAnchor.right}
            handleClose={toggleDrawer('right', false)}
            handleOpen={toggleDrawer('right', true)}
        >
            <TextWrapper>
                <Flex flexDirection="column">
                    <P>
                        <Iconloader type="fa" name="Filter" />
                        Filters
                    </P>
                    <Flex justifyContent="flex-end" marginTop="1em" marginBottom="1em">
                        <Button
                            variant="text"
                            style={{ padding: '0.5em', height: '25px' }}
                            onClick={() => handleClearSelect()}
                        >
                            <P fsize="0.6em" color={theme!.colors.textSubtle}>
                                Clear All
                            </P>
                        </Button>
                    </Flex>
                    {renderContent({ content: renderSortClasses(), type: 'Class' })}
                    {renderContent({ content: renderSortRarity(), type: 'Rarity' })}
                    {renderContent({
                        content: renderSortCombatType(),
                        type: 'Combat Type',
                    })}
                </Flex>
            </TextWrapper>
        </Drawer>
    );
};

export default Filter;
