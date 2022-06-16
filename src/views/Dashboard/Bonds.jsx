import React from 'react';
import bbond from '../../assets/img/bbond-256.png'
import trolley from '../../assets/img/trolley.png'
import { ReactComponent as Download } from '../../assets/img/download.svg';
import { getDisplayBalance } from '../../utils/formatBalance';
import useBombFinance from '../../hooks/useBombFinance';
import useTokenBalance from '../../hooks/useTokenBalance';
import useBondStats from '../../hooks/useBondStats';


const Bonds = () => {
    const bombFinance = useBombFinance();
    const bondBalance = useTokenBalance(bombFinance?.BBOND);
    const bondStat = useBondStats();
    
    return (
        <>
            <div className='bonds'>
                <img src={bbond} alt="" width={60} height={60} />
                <div className='bonds-box-top'>
                    <h2 className='cap bonds-heading'> <span className='white'>Bonds</span></h2>
                    <h5 className='cap bonds-heading'> <span className='white'>BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1 </span></h5>
                </div>
                <div>
                    <div className='bond-table'>
                        <table cellSpacing={10} cellPadding={2}>
                            <thead>
                                <tr>
                                    <th className='thin gray'>Current Price: (Bomb)^2 </th>
                                    <th className='thin gray'> Available to Redeem: </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><h2 className='bond-balance white'> <span className='white cap'>BBond = {Number(bondStat?.tokenInFtm).toFixed(4)} </span></h2></td>
                                    <td className='thin'> <img src={bbond} width={40} height={40} alt="" /> <h1 className='bond-balance white'>${getDisplayBalance(bondBalance)}</h1></td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                    <div className='bond-purchase'>
                        <div className='ib'>
                            <h3 className='thin cap'> <span className='white'>Purchase BBond</span></h3>
                            <h4 className='thin cap'> <span className='gray'>Bomb is over peg</span></h4>
                        </div>
                        <div className='ib'>
                            <button className='btn shift-up btn-purchase'>
                                <span className='white button-size-md btn-ib'> Purchase <img className="trolley-img" src={trolley} alt="" width={25} height={25} /> </span>
                            </button>
                            <hr className='hr-purchase' />
                        </div>
                        <div className='ib2'>
                            <h3 className='thin cap'> <span className='white'>Redeem Bomb</span></h3>
                        </div>
                        <div className='ib2'>
                            <button className='btn shift-up btn-purchase'>
                                <span className='white button-size-md btn-ib'> Redeem </span> <Download className="img-download" width={25} height={25} /> 
                            </button>
                        </div>
                        
                    </div>

                </div>
            </div>
        </>
    )
}

export default Bonds

