import { SectHdr, TitleCard, SectCont } from '../Styled';
import FAQs from '../Data/FAQs';
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import styles from './Styles/accordionStyle.module.css';
import chevronDown from '../../chevron-down.svg';

export default function App() {
    return (
        <>
            <div className="page-section" id="faqs">
                {/* About Heading */}
                <SectHdr>
                    <TitleCard className='titleCard' padding="2rem 6.5rem">
                        <h1>FAQs</h1>
                    </TitleCard>
                </SectHdr>
                <SectCont
                    className="accordion"
                    style={{ flexFlow: 'column wrap', gap: '1em' }}
                    margin="auto"
                    maxWidth="1140px"
                >
                    <Accordion allowMultiple transition transitionTimeout={250}>
                        {FAQs.map(({ question, answer }, i) => (
                            <Item
                                key={i}
                                style={{ marginBottom: '2rem' }}
                                header={
                                    <>
                                        <h2>{`${i + 1}. ${question}`}</h2>
                                        <img
                                            className={styles.chevron}
                                            src={chevronDown}
                                            alt="Chevron Down"
                                        />
                                    </>
                                }
                                className={styles.item}
                                buttonProps={{
                                    className: ({ isEnter }) =>
                                        `${styles.itemBtn} ${
                                            isEnter && styles.itemBtnExpanded
                                        }`,
                                }}
                                contentProps={{ className: styles.itemContent }}
                                panelProps={{ className: styles.itemPanel }}
                            >
                                <p
                                    style={{
                                        borderLeft: 'solid white',
                                        padding: '2rem 0 2rem 1rem',
                                    }}
                                >
                                    {i === 3 ? (
                                        <a
                                            href="https://opensea.io/collection/metasagawarriors"
                                            target="_blank"
                                        >
                                            {answer}
                                        </a>
                                    ) : (
                                        answer
                                    )}
                                </p>
                            </Item>
                        ))}
                    </Accordion>
                </SectCont>
            </div>
        </>
    );
}
