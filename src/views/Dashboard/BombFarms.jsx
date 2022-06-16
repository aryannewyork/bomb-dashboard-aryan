import React from 'react';
import bomb2 from '../../assets/img/bomb2.png';
import useBanks from '../../hooks/useBanks';
import { Farmtable } from './Farmtable';

const BombFarms = () => {

    const [banks] = useBanks();

    const activeBanks = banks.filter((bank) => !bank.finished);

    return (
        <>
            <div className="bondfarms">
                <div className='bombfarms-heading-box'>
                    <h2 className='thin cap bomb-farm-heading'> <span className='white'>Bomb Farms</span></h2>
                    <h5 className='thin cap bomb-farm-subheading'> <span className='white'>Stake your LP tokens in our farms to start earning $BSHARE</span></h5>
                </div>
                <button className='claim-all btn'>
                    <span className='white button-size-md'> Claim All </span><img className='img-bomb2' src={bomb2} alt="" width={25} height={25} />
                </button>
                {activeBanks.filter((bank) => bank.sectionInUI === 3).map((bank) => (
                    <React.Fragment key={bank.name}>
                        <Farmtable bank={bank} />
                    </React.Fragment>
                ))}
            </div>
        </>
    )
}

export default BombFarms;

