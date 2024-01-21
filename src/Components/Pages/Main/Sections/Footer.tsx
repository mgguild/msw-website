import styled from 'styled-components';
import { SectHdr, TitleCard, SectCont } from '../../../Styled';
import { PrivPolTermsCond } from '../../../Modals';
import React, { useState, useEffect } from 'react';

const Content = styled.div`
    background-color: #0f0015;
    z-index: 10;
    padding: 2rem 2rem 0 2rem;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;

    h4 {
        font-size: 1.5rem;
        text-align: center;

        @media (max-width: 720px){
            font-size: small;
        }
    }
`;

const FooterRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: center;

    @media (max-width: 1105px) {
        display: flex;
        flex-flow: column nowrap;
    }
`;

const LeftContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 590px) {
        flex-flow: column nowrap;
    }
`;

const ImgContainer = styled.div`
    display: flex;
    justify-content: right;

    @media (max-width: 1105px) {
        justify-content: left;
    }
`;

export default function App() {
    const [email, setEmail] = useState('');

    return (
        <>
            <div
                className="footer-section"
                id="footer"
                style={{ padding: '0', position: 'relative', top: '-0.5rem' }}
            >
                <SectCont margin="none" minHeight="none">
                    <Content>
                        <h4>Want to be updated for the latest updates? Register your email below and click the Notify Me button.</h4>
                       
                        <div style={{ margin: '1rem auto' }}>
                            <form
                                action="https://metasagawarriors.us10.list-manage.com/subscribe/post?u=29581b54e89450fc09142e23d&amp;id=baac775905&amp;f_id=00d636e2f0"
                                method="post"
                                id="mc-embedded-subscribe-form"
                                name="mc-embedded-subscribe-form"
                                className="validate"
                                target="_self"
                            >
                                <div id="mc_embed_signup_scroll">
                                    <input
                                        type="email"
                                        placeholder="Please enter your email address"
                                        defaultValue={email}
                                        onChange={e => setEmail(e.target.value)}
                                        name="EMAIL"
                                        className="required email"
                                        id="mce-EMAIL"
                                        required
                                    />
                                    <span
                                        id="mce-EMAIL-HELPERTEXT"
                                        className="helper_text"
                                    ></span>
                                </div>
                                <div id="mce-responses" className="clear foot">
                                    <div
                                        className="response"
                                        id="mce-error-response"
                                        style={{ display: 'none' }}
                                    ></div>
                                    <div
                                        className="response"
                                        id="mce-success-response"
                                        style={{ display: 'none' }}
                                    ></div>
                                </div>
                                {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
                                <div
                                    style={{ position: 'absolute', left: '-5000px' }}
                                    aria-hidden="true"
                                >
                                    <input
                                        type="text"
                                        name="b_29581b54e89450fc09142e23d_baac775905"
                                        tabIndex={-1}
                                        defaultValue={''}
                                    />
                                </div>
                                <div className="optionalParent">
                                    <div className="clear foot">
                                        <input
                                            type="submit"
                                            placeholder='Notify Me'
                                            defaultValue={'Notify Me'}
                                            name="subscribe"
                                            id="mc-embedded-subscribe"
                                            className="button"
                                            value="Notify Me" 
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <a
                            href="https://metagg.gitbook.io/metasaga-warriors/"
                            target="_blank"
                        >
                            <h4>Read more about the game</h4>
                        </a>
                        <br />
                        <br />
                        <FooterRow>
                            <LeftContainer>
                                <ImgContainer>
                                    <a
                                        className="footer-img"
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                        href="index.html"
                                    >
                                        <img
                                            style={{ width: '8rem' }}
                                            src={require('../../../../Assets/img/MSW_Logo_header.png')}
                                            alt=""
                                            className="w-5 px-xl-0"
                                        />
                                    </a>
                                </ImgContainer>
                                <div style={{ lineHeight: '2rem', textAlign: 'center' }}>
                                    <div className="copyright">
                                        Copyright &copy; 2024 MetaGaming Guild. All Rights
                                        Reserved
                                    </div>
                                    <PrivPolTermsCond />
                                </div>
                            </LeftContainer>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <a
                                    className="btn-footer btn-social "
                                    href="https://t.me/MetaSagaWarriors"
                                    target="_blank"
                                >
                                    <i className="fab fa-fw fa-telegram"></i>{' '}
                                </a>
                                <a
                                    className="btn-footer btn-social "
                                    href="https://twitter.com/metasagawarrior"
                                    target="_blank"
                                >
                                    <i className="fab fa-fw fa-twitter"></i>
                                </a>
                                <a
                                    className="btn-footer btn-social "
                                    href="https://www.facebook.com/MetaSagaWarriorsOfficial/"
                                    target="_blank"
                                >
                                    <i className="fab fa-fw fa-facebook"></i>
                                </a>
                                <a
                                    className="btn-footer btn-social "
                                    href="mailto:support@metasagawarriors.com"
                                    target="_blank"
                                >
                                    <i className="fab fa fa-envelope"></i>
                                </a>
                                <a
                                    className="btn-footer btn-social "
                                    href="https://www.instagram.com/metasagawarriors"
                                    target="_blank"
                                >
                                    <i className="fab fa-fw fa-instagram"></i>
                                </a>
                                <a
                                    className="btn-footer btn-social "
                                    href="https://www.linkedin.com/company/metasaga-warriors"
                                    target="_blank"
                                >
                                    <i className="fab fa-fw fa-linkedin"></i>
                                </a>
                                <a
                                    className="btn-footer btn-social "
                                    href="https://medium.com/@metasagawarriors"
                                    target="_blank"
                                >
                                    <i className="fab fa-fw fa-medium"></i>
                                </a>
                                <a
                                    className="btn-footer btn-social "
                                    href="https://www.youtube.com/@metasagawarriors"
                                    target="_blank"
                                >
                                    <i className="fab fa-fw fa-youtube"></i>
                                </a>
                                <a
                                    className="btn-footer btn-social "
                                    href="https://www.threads.net/@metasagawarriors"
                                    target="_blank"
                                >
                                    {' '}
                                    <img
                                        src={require('../../../../Assets/img/threads.png')}
                                        className="threads"
                                    />
                                </a>
                            </div>
                        </FooterRow>
                    </Content>
                </SectCont>
            </div>
        </>
    );
}
