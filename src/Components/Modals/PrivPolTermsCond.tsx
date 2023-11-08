import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';

const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

const CenterFrame = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    position: relative;
    background-color: #4f19a7;
    display: flex;
    flex-flow: column nowrap;
    border: white solid 2px;
    border-radius: 10px;
    min-width: 15rem;
    max-height: 95vh;
    overflow-y: scroll;
    width: 60rem;
    gap: 1rem;
    margin: 1rem;
    padding: 1rem;


    h1 {
        font-family: 'Alphakind', cursive;
        font-weight: 1000;
        font-size: 2rem;
        text-align: center;
        letter-spacing: 0.15rem;
    }

    h2 {
        font-family: 'Alphakind', cursive;
        font-weight: 1000;
        font-size: 1.5rem;
        text-align: start;
    }

    ul {
        list-style-type: circle;

        li {
            margin-left: 1.5rem;
        }
    }
`;


export default function LoginRegister() {

    const [openPP, setOpenPP] = useState(false);
    const [openTC, setOpenTC] = useState(false);


    return (
        <>
            <Modal
                open={openPP}
                onClose={() => setOpenPP(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CenterFrame>
                        <Container>
                            <div style={{position: 'absolute', top: '1rem', right: '1rem'}}>
                                <button style={{fontSize: '2rem'}} onClick={() => setOpenPP(false)}>
                                    🗙
                                </button>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                                <h1><u>PRIVACY POLICY</u></h1>
                            </div>
                            <p>
                                MetaGaming Guild built the MetaSaga Warriors app as
                                a Free app. This SERVICE is provided by
                                MetaGaming Guild at no cost and is intended for use as
                                is.
                            </p>
                            <p>
                                This page is used to inform visitors regarding our
                                policies with the collection, use, and disclosure of Personal
                                Information if anyone decided to use our Service.
                            </p>
                            <p>
                                If you choose to use our Service, then you agree to
                                the collection and use of information in relation to this
                                policy. The Personal Information that we collect is
                                used for providing and improving the Service. We will not use or share your information with
                                anyone except as described in this Privacy Policy.
                            </p>
                            <p>
                                The terms used in this Privacy Policy have the same meanings
                                as in our Terms and Conditions, which is accessible at
                                MetaSaga Warriors unless otherwise defined in this Privacy Policy.
                            </p>

                            <h2>Information Collection and Use</h2>
                            <p>
                                For a better experience, while using our Service, we
                                may require you to provide us with certain personally
                                identifiable information. The information that
                                we request will be retained by us and used as described in this privacy policy.
                            </p>

                            <h2>Log Data</h2>
                            <p>
                                We want to inform you that whenever you
                                use our Service, in a case of an error in the app
                                we collect data and information (through third party
                                products) on your phone called Log Data. This Log Data may
                                include information such as your device Internet Protocol
                                (“IP”) address, device name, operating system version, the
                                configuration of the app when utilizing our Service,
                                the time and date of your use of the Service, and other
                                statistics.
                            </p>

                            <h2>Cookies</h2>
                            <p>
                                Cookies are files with a small amount of data that are
                                commonly used as anonymous unique identifiers. These are sent
                                to your browser from the websites that you visit and are
                                stored on your device's internal memory.
                            </p>
                            <p>
                                This Service does not use these “cookies” explicitly. However,
                                the app may use third party code and libraries that use
                                “cookies” to collect information and improve their services.
                                You have the option to either accept or refuse these cookies
                                and know when a cookie is being sent to your device. If you
                                choose to refuse our cookies, you may not be able to use some
                                portions of this Service.
                            </p>

                            <h2>Service Providers</h2>
                            <p>
                                We may employ third-party companies and
                                individuals due to the following reasons:
                            </p>
                            <ul>
                                <li>To facilitate our Service;</li>
                                <li>To provide the Service on our behalf;</li>
                                <li>To perform Service-related services; or</li>
                                <li>To assist us in analyzing how our Service is used.</li>
                            </ul>

                            <p>
                                We want to inform users of this Service
                                that these third parties have access to your Personal
                                Information. The reason is to perform the tasks assigned to
                                them on our behalf. However, they are obligated not to
                                disclose or use the information for any other purpose.
                            </p>
                            <h2>Security</h2>
                            <p>
                                We value your trust in providing us your
                                Personal Information, thus we are striving to use commercially
                                acceptable means of protecting it. But remember that no method
                                of transmission over the internet, or method of electronic
                                storage is 100% secure and reliable, and we cannot
                                guarantee its absolute security.
                            </p>

                            <h2>Links to Other Sites</h2>
                            <p>
                                This Service may contain links to other sites. If you click on
                                a third-party link, you will be directed to that site. Note
                                that these external sites are not operated by us.
                                Therefore, we strongly advise you to review the
                                Privacy Policy of these websites. We have
                                no control over and assume no responsibility for the content,
                                privacy policies, or practices of any third-party sites or
                                services.
                            </p>

                            <h2>Children’s Privacy</h2>
                            <p>
                                These Services do not address anyone under the age of 13.
                                We do not knowingly collect personally
                                identifiable information from children under 13 years of age. In the case
                                we discover that a child under 13 has provided
                                us with personal information, we immediately
                                delete this from our servers. If you are a parent or guardian
                                and you are aware that your child has provided us with
                                personal information, please contact us so that
                                we will be able to do necessary actions.
                            </p>

                            <h2>Changes to This Privacy Policy</h2>
                            <p>
                                We may update our Privacy Policy from
                                time to time. Thus, you are advised to review this page
                                periodically for any changes. We will
                                notify you of any changes by posting the new Privacy Policy on
                                this page.
                            </p>
                            <p>This policy is effective as of 2022-07-07.</p>

                            <h2>Contact Us</h2>
                            <p>
                                If you have any questions or suggestions about our
                                Privacy Policy, do not hesitate to contact us at <a href="mailto:support@metasagawarriors.com">support@metasagawarriors.com</a>.
                            </p>
                        </Container>
                    </CenterFrame>
                </Box>
            </Modal>
            <Modal
                open={openTC}
                onClose={() => setOpenTC(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CenterFrame>
                        <Container>
                            <div style={{position: 'absolute', top: '1rem', right: '1rem'}}>
                                <button style={{fontSize: '2rem'}} onClick={() => setOpenTC(false)}>
                                    🗙
                                </button>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                                <h1><u>TERMS AND CONDITIONS</u></h1>
                            </div>
                            <p>
                                By downloading or using the app, these terms will
                                automatically apply to you – you should make sure therefore
                                that you read them carefully before using the app. You’re not
                                allowed to copy, or modify the app, any part of the app, or
                                our trademarks in any way. You’re not allowed to attempt to
                                extract the source code of the app, and you also shouldn’t try
                                to translate the app into other languages, or make derivative
                                versions. The app itself, and all the trade marks, copyright,
                                database rights and other intellectual property rights related
                                to it, still belong to MetaGaming Guild.
                            </p>
                            <p>
                                MetaGaming Guild is committed to ensuring that the app is
                                as useful and efficient as possible. For that reason, we
                                reserve the right to make changes to the app or to charge for
                                its services, at any time and for any reason. We will never
                                charge you for the app or its services without making it very
                                clear to you exactly what you’re paying for.
                            </p>
                            <p>
                                The MetaSaga Warriors app stores and processes personal data that
                                you have provided to us, in order to provide our
                                Service. It’s your responsibility to keep your phone and
                                access to the app secure. We therefore recommend that you do
                                not jailbreak or root your phone, which is the process of
                                removing software restrictions and limitations imposed by the
                                official operating system of your device. It could make your
                                phone vulnerable to malware/viruses/malicious programs,
                                compromise your phone’s security features and it could mean
                                that the MetaSaga Warriors app won’t work properly or at all.
                            </p>
                            <p>
                                You should be aware that there are certain things that
                                MetaGaming Guild will not take responsibility for. Certain
                                functions of the app will require the app to have an active
                                internet connection. The connection can be Wi-Fi, or provided
                                by your mobile network provider, but MetaGaming Guild
                                cannot take responsibility for the app not working at full
                                functionality if you don’t have access to Wi-Fi, and you don’t
                                have any of your data allowance left.
                            </p>

                            <p>
                                If you’re using the app outside of an area with Wi-Fi, you
                                should remember that your terms of the agreement with your
                                mobile network provider will still apply. As a result, you may
                                be charged by your mobile provider for the cost of data for
                                the duration of the connection while accessing the app, or
                                other third party charges. In using the app, you’re accepting
                                responsibility for any such charges, including roaming data
                                charges if you use the app outside of your home territory
                                (i.e. region or country) without turning off data roaming. If
                                you are not the bill payer for the device on which you’re
                                using the app, please be aware that we assume that you have
                                received permission from the bill payer for using the app.
                            </p>
                            <p>
                                Along the same lines, MetaGaming Guild cannot always take
                                responsibility for the way you use the app i.e. You need to
                                make sure that your device stays charged – if it runs out of
                                battery and you can’t turn it on to avail the Service,
                                MetaGaming Guild cannot accept responsibility.
                            </p>
                            <p>
                                With respect to MetaGaming Guild’s responsibility for your
                                use of the app, when you’re using the app, it’s important to
                                bear in mind that although we endeavour to ensure that it is
                                updated and correct at all times, we do rely on third parties
                                to provide information to us so that we can make it available
                                to you. MetaGaming Guild accepts no liability for any
                                loss, direct or indirect, you experience as a result of
                                relying wholly on this functionality of the app.
                            </p>
                            <h2>Changes to This Terms and Conditions</h2>
                            <p>
                                We may update our Terms and Conditions
                                from time to time. Thus, you are advised to review this page
                                periodically for any changes. We will
                                notify you of any changes by posting the new Terms and
                                Conditions on this page.
                            </p>
                            <p>
                                These terms and conditions are effective as of 2022-07-07.
                            </p>
                            <h2>Contact Us</h2>
                            <p>
                                If you have any questions or suggestions about our
                                Terms and Conditions, do not hesitate to contact us
                                at <a href="mailto:support@metasagawarriors.com">support@metasagawarriors.com</a>.
                            </p>
                        </Container>
                    </CenterFrame>
                </Box>
            </Modal>
            <div style={{display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                <a
                    style={{cursor: 'pointer'}}
                    className="privacy_policy"
                    onClick={(e) => {
                        e.preventDefault();
                        setOpenPP(true);
                    }}
                >
                    Privacy Policy
                </a>
                <a
                    style={{cursor: 'pointer'}}
                    className="terms_and_condition"
                    onClick={(e) => {
                        e.preventDefault();
                        setOpenTC(true);
                    }}
                >
                    Terms and Conditions
                </a>
            </div>
        </>
    );
}
