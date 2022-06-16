import React, { useMemo } from 'react';
// import { useWallet } from 'use-wallet';
import moment from 'moment';
// import { Container, Typography } from '@material-ui/core';
import useBombFinance from '../../hooks/useBombFinance';
import useBombStats from '../../hooks/useBombStats';
import usebShareStats from '../../hooks/usebShareStats';
import useBondStats from '../../hooks/useBondStats';
import { roundAndFormatNumber } from '../../0x';
import { Button } from '@material-ui/core';
import ProgressCountdown from './../Boardroom/components/ProgressCountdown.tsx';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import { ReactComponent as MetamaskFox } from '../../assets/img/metamask-fox.svg';
// import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
// import useXbombAPR from '../../hooks/useXbombAPR';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
// import useCurrentEpoch from '../../hooks/useCurrentEpoch';

const Summary = () => {

    const bombStats = useBombStats();
    const bShareStats = usebShareStats();
    const currentEpoch = useCurrentEpoch();
    // const XbombAPR = useXbombAPR();
    const tBondStats = useBondStats();
    const bombFinance = useBombFinance();
    const TVL = useTotalValueLocked();
    // const cashStat = useCashPriceInEstimatedTWAP();

    const { to } = useTreasuryAllocationTimes();

    const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);
    const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
    const bombPriceInDollars = useMemo(() => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null), [bombStats],);
    // const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : null), [bombStats],);
    const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);

    const bShareCirculatingSupply = useMemo(() => (bShareStats ? String(bShareStats.circulatingSupply) : null), [bShareStats],);
    const bSharePriceInDollars = useMemo(() => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null), [bShareStats],);
    // const bSharePriceInBNB = useMemo(() => (bShareStats ? Number(bShareStats.tokenInFtm).toFixed(4) : null), [bShareStats],);

    const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);
    const tBondCirculatingSupply = useMemo(() => (tBondStats ? String(tBondStats.circulatingSupply) : null), [tBondStats],);
    const tBondPriceInDollars = useMemo(() => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null), [tBondStats],);
    // const tBondPriceInBNB = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats],);

    // const xbombTVL = useMemo(() => (XbombAPR ? Number(XbombAPR.TVL).toFixed(0) : null), [XbombAPR]);

    return (
        <>
            <div className="SummaryCard">
                <div className="heading">Bomb Finance Summary</div>
                <hr />
                <div className="contents">
                    <div className="Supply-table">
                        <table cellPadding={10} cellSpacing={2}><tbody>
                            <tr>
                                <th></th>
                                <th>Current Supply</th>
                                <th>Total Supply</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                            <tr>
                                <td>
                                    <div className="navTokenIcon bomb table"></div>
                                    {'$BOMB'}
                                </td>
                                <td>{roundAndFormatNumber(bombCirculatingSupply, 2)}</td>
                                <td>{roundAndFormatNumber(bombTotalSupply, 2)}</td>
                                <td rowSpan={2}>{"$"}{roundAndFormatNumber(bombPriceInDollars, 2)} :</td>
                                <td>
                                    <Button
                                        onClick={() => {
                                            bombFinance.watchAssetInMetamask('BOMB');
                                        }}>
                                        {''}
                                        <MetamaskFox />

                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                            <tr>
                                <td>
                                    <div className="navTokenIcon bshare table"></div>
                                    {'$BSHARE'}
                                </td>
                                <td>{roundAndFormatNumber(bShareCirculatingSupply, 2)}</td>
                                <td>{roundAndFormatNumber(bShareTotalSupply, 2)}</td>
                                <td rowSpan={2}>{"$"}{roundAndFormatNumber(bSharePriceInDollars, 2)}</td>
                                <td>
                                    <Button
                                        onClick={() => {
                                            bombFinance.watchAssetInMetamask('BSHARE');
                                        }}>
                                        {''}
                                        <MetamaskFox />

                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                            <tr>
                                <td>
                                    <div className="navTokenIcon bbond table"></div>
                                    {'$BBOND'}
                                </td>
                                <td>{roundAndFormatNumber(tBondCirculatingSupply, 2)}</td>
                                <td>{roundAndFormatNumber(tBondTotalSupply, 2)}</td>
                                <td rowSpan={2}>{"$"}{roundAndFormatNumber(tBondPriceInDollars, 2)}</td>
                                <td>
                                    <Button
                                        onClick={() => {
                                            bombFinance.watchAssetInMetamask('BBOND');
                                        }}>
                                        {''}
                                        <MetamaskFox />

                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    <div className="Supply-table Epoch-stats">
                        <h1 className="epoch-heading cap">Current Epoch</h1>
                        <h1>{Number(currentEpoch)}</h1>
                        <hr className='epoch-hr' />
                        <h1><ProgressCountdown className="Next-epoch" base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" /></h1>
                        <h3 className="epoch-heading cap">Next Epoch in</h3>
                        <hr className='epoch-hr' />
                        <h5><span className='cap'>Live </span>Twap: <span className="green"> TWAP</span></h5>
                        <h5 className='cap'>TVL: <span className="green"> {TVL}</span></h5>
                        <h5 className='cap'>Last Epoch TWAP: <span className="green"> L-TWAP </span></h5>
                    </div>
                </div>

            </div>
        </>)



}

export default Summary

