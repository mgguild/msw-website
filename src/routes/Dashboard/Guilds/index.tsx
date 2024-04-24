import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../../../Components/Dashboard';
import Logo from '../../../Assets/img/discord_logo.png';
import usePlayfab from '../../../Hooks/usePlayfab';
import { CreateGuild } from '../../../Components/Modals';
import { useRGuild } from '../../../Components/Marketplace/state/hooks';
import { getGuildList } from '../../../Components/Marketplace/state/playfab/playfab';
import { MembersRole, PFGuildData } from '../../../Components/Marketplace/state/types';
import { useAppDispatch } from '../../../Components/Marketplace/state';
import { useFetchGuildList } from '../../../Components/Marketplace/state/hooks';
import { P } from '../../../Components/Marketplace/views/MarketplaceV2/components/Foundation/Text';

const SettingBtn = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: #FFB800;
    color: black;
    padding: 0.5rem;
`

const Guilds: FC = () => {
    const dispatch = useAppDispatch();
    const userGuild = useRGuild();
    const user = usePlayfab((state: any) => state.user);
    const guildList = useFetchGuildList();
    const dummyNums = [3, 2, 2, 1, 1, 2]

    const [page, setPage] = useState(0);
    // const [members, setMembers] = useState<MembersRole[]>([]);

    useEffect(() => {
        const _getGuildList = async () => {
           await dispatch(getGuildList());

           if(!userGuild.name){
                setPage(0);
            }else{
                // setMembers(userGuild.coMembers);
                console.log("CO MEMBERS");
                console.log(userGuild.coMembers);
                console.log("==============");
                userGuild.coMembers.map((memberType, index) => {
                    console.log(memberType.RoleName);
                    memberType.Members.map((member, index) => {
                        console.log(member);
                        console.log(member.Lineage);
                        // if(member.Lineage){
                        //     console.log(member.Lineage?.master_player_account.Id)
                        // }
                    })
                })
                console.log("==============");
            }
        }
        _getGuildList();
    }, [userGuild, user]);

    return (
        <>
            <div>
                <div className="flex flex-col justify-center items-center gap-5 pb-[2em]">
                    <p className="font-bold text-[48px]">Guilds</p>
                    {/* <p>
                        Lorem ipsum dolor sit amet, consectetur sodipscing elitr, sed diam
                        nonumy eirmod tempor invidunt
                    </p> */}
                </div>
                <div className="flex flex-col justify-center items-center">
                    {!userGuild.name && <CreateGuild />}
                </div>
                <div style={{position: 'relative'}} className="bg-[#0F1637] rounded-[5px] w-full p-5 my-[2em] gap-5">
                    { page === 0 ?
                        <>
                            <p className="uppercase text-[48px] font-bold text-center ">
                                All GUILDS
                            </p>
                            {userGuild.name &&
                                <SettingBtn className="uppercase text-[1.2em] font-bold text-center" onClick={() => setPage(1)}>
                                    My Guild
                                </SettingBtn>
                            }
                            {/* <p className="text-center my-4">
                                Lorem ipsum dolor sit amet, consectetur sodipscing elitr, sed diam
                                nonumy eirmod tempor invidunt
                            </p> */}
                            <div className="flex flex-wrap justify-start items-center gap-5">
                                <div className="flex flex-wrap justify-between items-center w-full">
                                    <div className="bg-[#0F1637] bg-opacity-50 rounded-[5px] w-[48%] p-2 flex flex-wrap justify-center items-start">
                                        <p>Guild</p>
                                    </div>

                                    <div className="bg-[#0F1637] bg-opacity-50 rounded-[5px] w-[48%] p-2 flex flex-wrap justify-center items-start">
                                        <p>Watchers</p>
                                    </div>

                                    <div className="line justify-center"></div>
                                    <br />
                                    <br />
                                    { guildList && guildList.map((guild, index) => {
                                            return (
                                                <>
                                                    <div className="flex flex-col justify-center items-center gap-5 w-[50%]">
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            {/* <img
                                                                src={Logo}
                                                                width={122}
                                                                alt="MetaSaga Warriors logo"
                                                                style={{ marginRight: '10px' }}
                                                            />
                                                            <div>
                                                                <p>Lorem Ipsum</p>
                                                                <p>@loremipsum</p>
                                                            </div> */}

                                                            { userGuild.name === guild.GroupName ?
                                                                <h1 style={{color: '#FFB800'}}>
                                                                    {guild.GroupName}
                                                                </h1>
                                                                :
                                                                <h1>
                                                                    {guild.GroupName}
                                                                </h1>
                                                            }

                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col justify-center items-center gap-5 w-[50%]">
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <div>
                                                                <p>{dummyNums[index]}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </>
                    :
                    <>
                        <p className="uppercase text-[48px] font-bold text-center ">
                            { userGuild.name }
                        </p>
                        <SettingBtn className="uppercase text-[1.2em] font-bold text-center " onClick={() => setPage(0)}>
                            Go Back
                        </SettingBtn>
                        {/* <p className="text-center my-4">
                            Lorem ipsum dolor sit amet, consectetur sodipscing elitr, sed diam
                            nonumy eirmod tempor invidunt
                        </p> */}

                        <div style={{display: 'flex', width: ' 100%', justifyContent: 'end', gap: '0.5rem'}}>
                            <CreateGuild mode='invite'/>
                            <CreateGuild mode='edit'/>
                            <CreateGuild mode='delete'/>
                        </div>
                        <div className="flex flex-wrap justify-start items-center gap-5">
                            <div className="flex flex-wrap justify-between items-center w-full">
                                <div className="bg-[#0F1637] bg-opacity-50 rounded-[5px] w-[48%] p-2 flex flex-wrap justify-center items-start">
                                    <p>Member</p>
                                </div>

                                <div className="bg-[#0F1637] bg-opacity-50 rounded-[5px] w-[48%] p-2 flex flex-wrap justify-center items-start">
                                    <p>Role</p>
                                </div>

                                <div className="line justify-center"></div>
                                <br />
                                <br />

                                {/* { userGuild && members.map((MemberType, index) => {
                                            return (
                                                <>
                                                    {MemberType.Members.map((member, index) => {
                                                        return(
                                                        <>
                                                        <div className="flex flex-col justify-center items-center gap-5 w-[50%]">
                                                            <div style={{ display: 'flex', alignItems: 'center' }}>

                                                                {member.Lineage?.master_player_account.Id === user.PlayFabId ?
                                                                    <h1 style={{color: '#FFB800'}}>
                                                                        {member.Lineage?.master_player_account.Id}
                                                                    </h1>
                                                                    :
                                                                    <h1>
                                                                        {member.Lineage?.master_player_account.Id}
                                                                    </h1>
                                                                }
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col justify-center items-center gap-5 w-[50%]">
                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                <div>
                                                                    <p>{MemberType.RoleName}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        </>)
                                                    })}
                                                </>
                                            )
                                        })
                                    } */}
                            </div>
                        </div>
                    </>
                    }
                </div>
            </div>
        </>
    );
};

export default Guilds;
