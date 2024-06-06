import { FC } from 'react';
import styled from 'styled-components';
import { Button } from '../../../Components/Dashboard';
import { FaSquareXTwitter, FaSquareFacebook, FaDiscord, FaTelegram } from 'react-icons/fa6';

const Text = styled.span`
    font-family: 'Mustica Pro';
`

const Social: FC = () => {
    return (
        <>
            <div className="text-center mb-[2em]">
                <p className="text-[48px] uppercase">Connect Socials</p>
            </div>
            <div className="flex flex-wrap justify-center items-stretch gap-5">
                <div className="bg-[#0F1637] rounded-[5px] p-[2em] w-[60%]">
                    <div className="text-center my-[2em]">
                        <p>
                        Connect your social media account to unlock exclusive in-game rewards and share your achievements with friends! Click here to bind your account and join the community fun.
                        </p>
                    </div>
                    <div className="bg-[#19297F] rounded-[5px] py-[2em] flex flex-wrap justify-center items-center gap-5">
                        <div className="flex flex-col justify-center items-center gap-5 w-[40%]">
                            <div className="flex flex-wrap justify-center items-center gap-5">
                                <FaSquareXTwitter size={'3rem'} />
                                <Text>Not Connected</Text>
                            </div>
                            <div>
                                <Button value="Connect" />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-5 w-[40%]">
                            <div className="flex flex-wrap justify-center items-center gap-5">
                                <FaSquareFacebook size={'3rem'} />
                                <Text>Not Connected</Text>
                            </div>
                            <div>
                                <Button value="Connect" />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-5 w-[40%]">
                            <div className="flex flex-wrap justify-center items-center gap-5">
                                <FaDiscord size={'3rem'} />
                                <Text>Not Connected</Text>
                            </div>
                            <div>
                                <Button value="Connect" />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-5 w-[40%]">
                            <div className="flex flex-wrap justify-center items-center gap-5">
                                <FaTelegram size={'3rem'} />
                                <Text>Not Connected</Text>
                            </div>
                            <div>
                                <Button value="Change" secondary />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[30%] bg-[#0F1637] rounded-[5px] p-[2em] flex flex-col gap-[1em] justify-start items-center text-center">
                    <div>
                        <p className="text-[36px] uppercase">Account Deletion</p>
                    </div>
                    <div>
                        <p>Deleting your account will automatically revoke your in-game access. Please proceed with caution.</p>
                    </div>
                    <div>
                        <Button value="Delete Account" secondary />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Social;
