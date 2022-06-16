import React, { useMemo } from 'react'
import useStatsForPool from '../../hooks/useStatsForPool';
import bomb2 from '../../assets/img/bomb2.png';
import { ReactComponent as Upload } from '../../assets/img/upload.svg';
import { ReactComponent as Download } from '../../assets/img/download.svg';
import useEarnings from '../../hooks/useEarnings';
import useHarvest from '../../hooks/useHarvest';
import useStakedBalance from '../../hooks/useStakedBalance';
import { getDisplayBalance } from '../../utils/formatBalance';
import TokenSymbol from '../../components/TokenSymbol';
import useStakedTokenPriceInDollars from '../../hooks/useStakedTokenPriceInDollars';
import useApprove, { ApprovalState } from '../../hooks/useApprove';
import useRedeem from '../../hooks/useRedeem';

export const Farmtable = ({ bank }) => {
    let statsOnPool = useStatsForPool(bank);
    const { onReward } = useHarvest(bank);
    const { onRedeem } = useRedeem(bank);
    const earnings = useEarnings(bank.contract, bank.earnTokenName, bank.poolId);
    const stakedBalance = useStakedBalance(bank.contract, bank.poolId);
    // console.log(bank);
    const stakedTokenPriceInDollars = useStakedTokenPriceInDollars(bank.depositTokenName, bank.depositToken);
    const tokenPriceInDollars = useMemo(
        () => (stakedTokenPriceInDollars ? stakedTokenPriceInDollars : null),
        [stakedTokenPriceInDollars],
    );
    const earnedInDollars = (
        Number(tokenPriceInDollars) * Number(getDisplayBalance(stakedBalance, bank.depositToken.decimal))
    ).toFixed(2);
    const [approveStatus, approve] = useApprove(bank.depositToken, bank.address);
    return (
        <> <div>
            <TokenSymbol symbol={bank.depositToken.symbol} size={54} /> <h2 className='bankname-farms thin'> <span className='white'>{bank.depositTokenName}</span></h2>
            <h3 className='TVL-farm thin'> <span className='gray'>TVL: <span className='TVL-number-farms'> ${statsOnPool?.TVL}</span></span></h3>
        </div>
            <div className='table-bombbtc'>
                <table cellPadding={2} cellSpacing={15}>
                    <thead>
                        <tr>
                            <th className='white thin'>Daily Returns:</th>

                            <th className='white thin'>Your Stake: </th>
                            <th className='white thin'>Earned:</th>
                        </tr>
                        <tr>
                            {" "}<td className='white thin'> {bank.closedForStaking ? '0.00' : statsOnPool?.yearlyAPR}%</td>{" "}
                            <td className='white thin'><TokenSymbol symbol={bank.depositToken.symbol} size={20} />{getDisplayBalance(stakedBalance, bank.depositToken.decimal)} <br /> <span>{`≈ $${earnedInDollars}`}</span></td>
                            <td className='white thin'>{getDisplayBalance(earnings)}</td>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className='buttons'>
                <button
                    disabled={
                        bank.closedForStaking ||
                        approveStatus === ApprovalState.PENDING ||
                        approveStatus === ApprovalState.UNKNOWN
                    }
                    onClick={approve}
                    className={
                        bank.closedForStaking ||
                            approveStatus === ApprovalState.PENDING ||
                            approveStatus === ApprovalState.UNKNOWN
                            ? 'shinyButtonDisabled'
                            : 'shinyButton2'
                    }
                    style={{ marginTop: '20px' }}
                >
                    <span className='white lg-btn'>Deposit</span>
                    <Upload className="img-download" width={25} height={25} />
                </button>
                <button
                    onClick={onReward}
                    disabled={earnings.eq(0)}
                    className={earnings.eq(0) ? 'shinyButtonDisabled' : 'shinyButton2'}
                >
                    <span className='white lg-btn'>Withdraw</span>
                    <Download className="img-download" width={25} height={25} />
                </button>
                <button onClick={onRedeem} className="claim-rewards-btn">
                <span className='white md-btn'>Claim Rewards <img className='img-bomb2_farm' src={bomb2} alt="" width={20} height={20} /></span>
                </button>
            </div>
            <br />
            <hr />
            <br />
        </>
    )
}
