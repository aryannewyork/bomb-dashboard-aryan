import React from 'react';
import { ReactComponent as Upload } from '../../assets/img/upload.svg';
import { ReactComponent as Download } from '../../assets/img/download.svg';
import bshare from '../../assets/img/bshare-200x200.png';
import discord from '../../assets/img/discord.svg';
import { getDisplayBalance } from '../../utils/formatBalance';
import useTotalStakedOnBoardroom from '../../hooks/useTotalStakedOnBoardroom';
import useFetchBoardroomAPR from '../../hooks/useFetchBoardroomAPR';
import useStakedBalanceOnBoardroom from '../../hooks/useStakedBalanceOnBoardroom';
import useEarningsOnBoardroom from '../../hooks/useEarningsOnBoardroom';
import useApprove, { ApprovalState } from '../../hooks/useApprove';
import useBombFinance from '../../hooks/useBombFinance';
import useHarvestFromBoardroom from '../../hooks/useHarvestFromBoardroom';
import useClaimRewardCheck from '../../hooks/boardroom/useClaimRewardCheck';
import useRedeemOnBoardroom from '../../hooks/useRedeemOnBoardroom';
import useWithdrawCheck from '../../hooks/boardroom/useWithdrawCheck';
import bomb2 from '../../assets/img/bomb2.png';


const Boardroom = () => {

    const boardroomAPR = useFetchBoardroomAPR();
    const earnings = useEarningsOnBoardroom();
    const totalStaked = useTotalStakedOnBoardroom();
    const stakedBalance = useStakedBalanceOnBoardroom();
    const bombFinance = useBombFinance();
    const [approveStatus, approve] = useApprove(bombFinance.BSHARE, bombFinance.contracts.Boardroom.address);
    const { onReward } = useHarvestFromBoardroom();
    const canClaimReward = useClaimRewardCheck();
    const canWithdraw = useWithdrawCheck();
    const { onRedeem } = useRedeemOnBoardroom();

    return (

        <>
            <div className='investment-outer-box'>
                <div className='investment-card'>
                    <div className='investment-pane ip1'>
                        <div className='invest-now-link'><a className="homepage-bomb-money white" href="https://www.bomb.money/"> <span className="cap white invest-now"> Invest Now </span></a></div>
                        <div className='discord'>
                            <h3 className='social-links cap'> <img src={discord} height={22} width={22} alt="" /> <a className='social' href="https://discord.com/invite/94Aa4wSz3e"> Chat on Discord</a></h3>
                        </div>
                        <div className="docs">
                            <h3 className='social-links cap'> <a className='social' href="https://docs.bomb.money/welcome-start-here/readme">Read Docs</a></h3>
                        </div>
                    </div>

                    <div className='InvestmentCard'>
                        <img className="bshare-200x200" src={bshare} alt="" width="75" height="75" />
                        <div className='bshare-stats'>
                            <h2 className='white cap thin'>Boardroom <button className='recommended-btn'> Recommended </button></h2>
                            <h4 className='white cap thin'>Stake BSHARE and earn BOMB every epoch</h4>
                        </div>
                        <div className='bshare-tvl'>TVL: </div>
                        <hr />
                        <div className='total-staked-bshare'>Total Staked: <img className='bshare-staked-img' src={bshare} alt="" width="25" height="25" />{getDisplayBalance(totalStaked)}</div>
                        <div>
                            <div className='boardroom-table'>
                                <table cellPadding={10} cellSpacing={2}>
                                    <thead>
                                        <tr>
                                            <th className='thin'>Daily Returns:</th>
                                            <th className='thin'>Your Stake:</th>
                                            <th className='thin'>Earned:</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className='thin'>{boardroomAPR.toFixed(2)}%</td>
                                            <td className='thin'>{getDisplayBalance(stakedBalance)}</td>
                                            <td className='thin'>{getDisplayBalance(earnings)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='buttons-boardroom'>
                                <button
                                    disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                                    className={approveStatus === ApprovalState.NOT_APPROVED ? 'shinyButton2-boardroom' : 'shinyButtonDisabled2'}
                                    style={{ marginTop: '20px' }}
                                    onClick={approve}
                                >
                                    <span className='white lg-btn'>Deposit</span>
                                    <Upload className="img-download" width={25} height={25} />
                                </button>

                                <button
                                    onClick={onReward}
                                    className={earnings.eq(0) || !canClaimReward ? 'shinyButtonDisabled2-boardroom' : 'shinyButton2-boardroom'}
                                    disabled={earnings.eq(0) || !canClaimReward}
                                >
                                    <span className='white lg-btn'>Withdraw</span>
                                    <Download className="img-download" width={25} height={25} />
                                </button>

                                <button
                                    disabled={stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)}
                                    onClick={onRedeem}
                                    className={
                                        stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)
                                            ? 'shinyButtonDisabled2-boardroom-claim-rewards'
                                            : 'shinyButton2-boardroom'
                                    }
                                >
                                    <span className='white lg-btn'>Claim Rewards <img className='img-bomb2_farm' src={bomb2} alt="" width={23} height={23} /></span>
                                </button>


                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </>)

}

export default Boardroom

