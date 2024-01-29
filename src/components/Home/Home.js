import { Modal } from 'react-bootstrap'
import {useEffect, useState} from "react";
import axios from 'axios';
import { ethers } from 'ethers';

// images
import logo from '../../img/logo.png';

function Home(props) {
    const contractAddress = '0x7a0c0d7c02bb2d5a9db7020371ed4816028e9cf5';
    const contractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"allowance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientBalance","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC20InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC20InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC20InvalidSender","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"ERC20InvalidSpender","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"principal","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"penalty","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"interest","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"penaltyReward","type":"uint256"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ClaimedVested","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardsDeposited","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"durationIndex","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Vested","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"VestingStartTimestampSet","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"depositRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"stakeIndex","type":"uint256"}],"name":"getStake","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"bool","name":"claimed","type":"bool"},{"internalType":"uint256","name":"reward","type":"uint256"},{"internalType":"uint256","name":"penalty","type":"uint256"},{"internalType":"uint256","name":"penaltyReward","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getStakeCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalPenaltiesAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalStakingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getVestedAmount","outputs":[{"internalType":"uint256","name":"vestedAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"initializeVesting","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"marketingFund","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_newMarketingFundAddress","type":"address"}],"name":"setMarketingFundAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"setVestingStartTimestamp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakeDurations","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"stakeRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"durationIndex","type":"uint256"}],"name":"stakeTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalStakedTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"stakeIndex","type":"uint256"}],"name":"withdrawAndClaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawMarketingFund","outputs":[],"stateMutability":"nonpayable","type":"function"}];

    const correctNetworkId = 97; // 56 or 97

    const initializeContract = async () => {
        let newContract = null;

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            newContract = new ethers.Contract(contractAddress, contractAbi, provider);
        } catch (error) {
            console.error('Error initializing contract:', error);
        }

        return newContract;
    };

    const [inputsValues, setInputsValues] = useState({
        addressIsConnected: false,
        address: null,
        stakeAmount: 1,
        stakingOption: 0,
        balance: 0,
        balanceFormatted: "0",
        stakes: [],
        totalStakedAmount: 0,
        totalAccumulatedRewards: 0,
        totalRewardsToBeReceived: 0,
        unstake: {
            amount: "0",
            reward: "0",
            penalty: "0",
            penaltyReward: "0",
        },
        ranks: [],
    })

    // Modals
    const [showModalProcessing, setShowModalProcessing] = useState(false);
    const handleCloseModalProcessing = () => setShowModalProcessing(false);
    const handleShowModalProcessing = () => setShowModalProcessing(true);
    const [showModalSuccess, setShowModalSuccess] = useState(false);
    const handleCloseModalSuccess = () => setShowModalSuccess(false);
    const handleShowModalSuccess = () => setShowModalSuccess(true);
    const [showModalError, setShowModalError] = useState(false);
    const handleCloseModalError = () => setShowModalError(false);
    const handleShowModalError = () => setShowModalError(true);
    const [showModalPenalty, setShowModalPenalty] = useState(false);
    const handleCloseModalPenalty = () => setShowModalPenalty(false);
    const handleShowModalPenalty = () => setShowModalPenalty(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputsValues({ ...inputsValues, [name]: value });
    }

    let numberFormat = function(x, decimal) {
        x = parseFloat(x);
        var parts = x.toFixed(2).toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if(decimal) {
            return parts.join(".");
        } else {
            return parts[0];
        }
    };

    let shortenAddress = function(prefixLength, postfixLength, string) {
        if (prefixLength + postfixLength >= string.length) {
            return string; // Return original string if prefix and postfix lengths are greater or equal to the string length
        }

        const prefix = string.substr(0, prefixLength);
        const postfix = string.substr(-postfixLength);

        return `${prefix}...${postfix}`;
    };

    let connectWallet = async function() {
        await checkNetwork();

        let connectWalletLabel = document.getElementById('connect-wallet');

        if(connectWalletLabel) {
            connectWalletLabel.innerHTML = "CONNECTING";
        }

        let _contract = await initializeContract();
        let _address = await connectAccount(_contract);

        if(connectWalletLabel) {
            connectWalletLabel.innerHTML = "CONNECT WALLET";
        }

        return [_contract, _address];
    };

    let connectAccount = async function(_contract) {
        let address = null;
        let connectWalletLabel = document.getElementById('connect-wallet');

        try {
            if (window.ethereum) {
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                const accounts = await window.ethereum.request({ method: 'eth_accounts' });

                if (accounts && accounts.length > 0) {
                    const connectedAddress = accounts[0];
                    await getAddressDetails(connectedAddress, _contract);
                    address = connectedAddress;
                }
            } else {
                handleShowModalError();
                document.getElementById('error-message').innerHTML = "MetaMask not installed.<br/> Please install MetaMask from <a href='https://metamask.io' class='text-color-2'>https://metamask.io</a> to proceed.";

                connectWalletLabel.innerHTML = "CONNECT WALLET";
            }
        } catch (error) {
            handleShowModalError();
            document.getElementById('error-message').innerHTML = error;

            connectWalletLabel.innerHTML = "CONNECT WALLET";
        }

        return address;
    };

    let getAddressDetails = async function(address, _contract) {
        let balance = await _contract.balanceOf(address);
        balance = parseInt(BigInt(balance) / BigInt(1000000000000000000));

        let stakes = [];
        let totalStakedAmount = 0;
        let totalAccumulatedRewards = 0;
        let totalRewardsToBeReceived = 0;

        let stakeCount = parseInt(await _contract.getStakeCount(address));

        for(let i = stakeCount - 1; i >= 0; i--) {
            let data = await _contract.getStake(address, i);

            stakes.push({
                index: i,
                amount: data.amount,
                duration: data.duration,
                startTime: data.startTime,
                claimed: data.claimed,
                reward: data.reward,
                penalty: data.penalty,
                penaltyReward: data.penaltyReward,
                totalWithdrawalAmount: parseInt(ethers.utils.formatUnits(data.amount, 'ether')) + parseInt(ethers.utils.formatUnits(data.reward, 'ether')) + parseInt(ethers.utils.formatUnits(data.penaltyReward, 'ether')) - parseInt(ethers.utils.formatUnits(data.penalty, 'ether')),
            });

            if(!data.claimed) {
                let percentage;
                if(parseInt(data.duration) === 30) {
                    percentage = 0.003125;
                } else if(parseInt(data.duration) === 90) {
                    percentage = 0.8750;
                } else if(parseInt(data.duration) === 180) {
                    percentage = 0.065;
                } else if(parseInt(data.duration) === 360) {
                    percentage = 0.26;
                }

                totalStakedAmount += parseInt(ethers.utils.formatUnits(data.amount, 'ether'));
                totalAccumulatedRewards += parseInt(ethers.utils.formatUnits(data.reward, 'ether'));
                totalRewardsToBeReceived += (parseInt(ethers.utils.formatUnits(data.amount, 'ether')) * percentage) + parseInt(ethers.utils.formatUnits(data.penaltyReward, 'ether'));
            }
        }

        let ranks = await storeAddress(address);

        let newInputsValues = { ...inputsValues, addressIsConnected: true, balance: balance, balanceFormatted: numberFormat(balance, false), stakes: stakes, address: address, totalStakedAmount: numberFormat(totalStakedAmount, false), totalAccumulatedRewards: numberFormat(totalAccumulatedRewards, false), totalRewardsToBeReceived: numberFormat(totalRewardsToBeReceived, false), ranks: ranks };
        setInputsValues(newInputsValues);
    };

    let selectStakingOption = async function(stakeIndex) {
        setInputsValues({ ...inputsValues, stakingOption: stakeIndex });
    };

    let inputMaxBalance = async function() {
        setInputsValues({ ...inputsValues, stakeAmount: inputsValues.balance });
    };

    let stake = async function() {
        let [ _contract, _address ] = await connectWallet();

        if(_address) {
            await getAddressDetails(_address, _contract);

            let stakeAmount = ethers.utils.parseUnits((inputsValues.stakeAmount).toString(), 'ether');
            let durationIndex = parseInt(inputsValues.stakingOption);

            try {
                handleShowModalProcessing();

                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner(accounts[0]);
                const connectedContract = _contract.connect(signer);
                const transaction = await connectedContract.stakeTokens(stakeAmount, durationIndex);

                await transaction.wait();
                await getAddressDetails(_address, _contract);

                handleCloseModalProcessing();
                handleShowModalSuccess();

                document.getElementById('success-message').innerHTML = "You have successfully staked " + numberFormat(inputsValues.stakeAmount, false) + "&nbsp;KEY.";

                // let ranks = await storeAddress(_address);
                //
                // let newInputsValues = { ...inputsValues, ranks: ranks };
                // setInputsValues(newInputsValues);
            } catch (error) {
                handleCloseModalProcessing();
                handleShowModalError();
                document.getElementById('error-message').innerHTML = error.message;
            }
        } else {
            handleShowModalError();
            document.getElementById('error-message').innerHTML = "Invalid Address";
        }
    };

    let unstake = async function(stakeIndex, forced) {
        let [ _contract, _address ] = await connectWallet();

        if(_address) {
            for(let i = 0; i < inputsValues.stakes.length; i++) {
                if(inputsValues.stakes[i].index === stakeIndex) {
                    if(parseInt(ethers.utils.formatUnits(inputsValues.stakes[i].penalty, 'ether')) === 0 || forced) {
                        if(forced) {
                            handleCloseModalPenalty();
                        }

                        try {
                            handleShowModalProcessing();

                            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                            const provider = new ethers.providers.Web3Provider(window.ethereum);
                            const signer = provider.getSigner(accounts[0]);
                            const connectedContract = _contract.connect(signer);
                            const transaction = await connectedContract.withdrawAndClaim(stakeIndex);

                            await transaction.wait();
                            await getAddressDetails(_address, _contract);

                            handleCloseModalProcessing();
                            handleShowModalSuccess();

                            document.getElementById('success-message').innerHTML = "You have successfully claimed your stake.";
                        } catch (error) {
                            handleShowModalError();
                            document.getElementById('error-message').innerHTML = error.message;
                        }
                    } else {
                        setInputsValues({ ...inputsValues, unstake: inputsValues.stakes[i] });
                        handleShowModalPenalty();
                    }
                }
            }
        } else {
            handleShowModalError();
            document.getElementById('error-message').innerHTML = "Invalid Address";
        }
    };

    let storeAddress = async function(address) {
        let data = new FormData();
        data.append('address', address);

        let lightAndShadowStakes = [];

        // await axios.post('https://kinameansbusiness.com/api/memelontusk/storeAddress', data)
        //     .then((response) => {
        //         lightAndShadowStakes = response.data.memelonTuskStakes;
        //     }).catch((error) => {
        //         console.log(error);
        //     })

        return lightAndShadowStakes;
    };

    let getLeaderboards = async function(address) {
        let data = new FormData();
        data.append('address', address);

        let lightAndShadowStakes = [];

        // await axios.post('https://kinameansbusiness.com/api/memelontusk/getStakes', data)
        //     .then((response) => {
        //         lightAndShadowStakes = response.data.memelonTuskStakes;
        //     }).catch((error) => {
        //         console.log(error);
        //     })
        //
        // setInputsValues({ ...inputsValues, ranks: lightAndShadowStakes });
    };

    const checkNetwork = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const network = await provider.getNetwork();

            if (network.chainId !== correctNetworkId) {
                await switchToCorrectNetwork(correctNetworkId);
            }
        } catch (error) {
            console.error('Error checking network:', error.message);
        }
    };

    const switchToCorrectNetwork = async (targetNetworkId) => {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: `0x${targetNetworkId.toString(16)}` }], // Convert to hex
            });
        } catch (error) {
            console.error('Error switching network:', error.message);
            // Handle the error, for example, show a message to the user
        }
    };

    // useEffect(async () => {
    //     await getLeaderboards();
    // }, []);

    return (
        <div className="home bg-color-1">
            <nav className="navbar bg-white navbar-expand-lg bg-body-tertiary py-2" style={{"borderBottom":"1px solid rgba(48, 50, 68, 0.3)"}}>
                <div className="container">
                    <a className="navbar-brand text-white d-flex align-items-center" href="#">
                        <div className="pe-4">
                            <img src={logo} width="50" alt="Light & Shadow" />
                        </div>
                        <div className="text-color-2">LIGHT &amp; SHADOW STAKING</div>
                    </a>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a href={ "https://pancakeswap.finance/swap?inputCurrency=eth&outputCurrency=" + contractAddress } target="_blank" rel="noreferrer" className="btn btn-custom-3 px-4" >BUY LIGHT &amp; SHADOW</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container py-5">
                <div className="mb-5 py-4">
                    <p className="font-size-200 text-color-2 poppins fw-bold text-center">Welcome to the Light And Shadow Token Staking Platform</p>
                    <p className="font-size-140 text-color-2 text-center">Embark on a Journey of Profitable Staking</p>
                    <p className="font-size-110 text-color-2 text-center">Discover the power of your investment with Light And Shadow Token. Our staking platform is designed to reward your commitment with competitive Annual Percentage Rates (APRs). Choose from our flexible staking options to best suit your financial goals.</p>
                </div>

                <div className="row mb-5">
                    <div className="col-lg-4 mb-4 mb-lg-0">
                        <div className="bg-white px-4 px-sm-5 px-lg-4 px-xxl-5 py-5" style={{border: "1px solid #071c1f"}}>
                            <div className="row align-items-center">
                                <div className="col-sm-9 col-lg-12 col-xl-9">
                                    <p className="text-color-2 font-size-180 mb-0">{ inputsValues.totalStakedAmount } KEY</p>
                                    <p className="text-color-2 font-size-100 mb-0">Staked Amount</p>
                                </div>
                                <div className="col-3 d-none d-sm-block d-lg-none d-xl-block">
                                    <div className="text-center">
                                        <i className="fa-solid fa-steak font-size-400 text-color-3"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 mb-4 mb-lg-0">
                        <div className="bg-white px-4 px-sm-5 px-lg-4 px-xxl-5 py-5" style={{border: "1px solid #071c1f"}}>
                            <div className="row align-items-center">
                                <div className="col-sm-9 col-lg-12 col-xl-9">
                                    <p className="text-color-2 font-size-180 mb-0">{ inputsValues.totalAccumulatedRewards } KEY</p>
                                    <p className="text-color-2 font-size-100 mb-0">Accumulated Rewards</p>
                                </div>
                                <div className="col-3 d-none d-sm-block d-lg-none d-xl-block">
                                    <div className="text-center">
                                        <i className="fa-solid fa-coins font-size-420 text-color-3"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="bg-white px-4 px-sm-5 px-lg-4 px-xxl-5 py-5" style={{border: "1px solid #071c1f"}}>
                            <div className="row align-items-center">
                                <div className="col-sm-9 col-lg-12 col-xl-9">
                                    <p className="text-color-2 font-size-180 mb-0">{ inputsValues.totalRewardsToBeReceived } KEY</p>
                                    <p className="text-color-2 font-size-100 mb-0">Rewards By End Of Stake</p>
                                </div>
                                <div className="col-3 d-none d-sm-block d-lg-none d-xl-block">
                                    <div className="text-center">
                                        <i className="fa-solid fa-sack-dollar font-size-420 text-color-3"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-color-1 p-4 p-sm-5 mb-5 bg-white" style={{border: "1px solid #071c1f"}}>
                    <p className="text-color-2 poppins font-weight-700 font-size-150">Stake & Earn Today!</p>
                    <p className="text-color-2 font-size-90 font-size-lg-80 font-size-xl-90">Explore diverse staking options tailored to your financial goals. Whether you're looking for short-term gains or long-term growth, we have the perfect plan for you.</p>

                    {
                        !inputsValues.addressIsConnected ?
                        <div className="mb-3">
                            <button className="btn btn-custom-3 w-100 px-4 py-3" id="connect-wallet" onClick={connectWallet}>CONNECT WALLET</button>
                        </div>
                        :
                        <div className="mb-3">
                            <div className="text-color-2 w-100 px-4 py-3" style={{"border":"1px solid rgb(48, 50, 68)"}}>Wallet Address:&nbsp;&nbsp;&nbsp;&nbsp;{ shortenAddress(6, 7, inputsValues.address) }</div>
                        </div>
                    }

                    <div className="row mb-3 px-1">
                        <div className="col-6 col-md-3 p-2">
                            <button className={'btn btn-custom-2 font-size-lg-80 font-size-xl-100 w-100 ' + (inputsValues.stakingOption === 0 ? 'active' : '')} onClick={() => selectStakingOption(0)}>1 MONTH<br/>3.75% APR</button>
                        </div>
                        <div className="col-6 col-md-3 p-2">
                            <button className={'btn btn-custom-2 font-size-lg-80 font-size-xl-100 w-100 ' + (inputsValues.stakingOption === 1 ? 'active' : '')} onClick={() => selectStakingOption(1)}>3 MONTHS<br/>7.5% APR</button>
                        </div>
                        <div className="col-6 col-md-3 p-2">
                            <button className={'btn btn-custom-2 font-size-lg-80 font-size-xl-100 w-100 ' + (inputsValues.stakingOption === 2 ? 'active' : '')} onClick={() => selectStakingOption(2)}>6 MONTHS<br/>13% APR</button>
                        </div>
                        <div className="col-6 col-md-3 p-2">
                            <button className={'btn btn-custom-2 font-size-lg-80 font-size-xl-100 w-100 ' + (inputsValues.stakingOption === 3 ? 'active' : '')} onClick={() => selectStakingOption(3)}>12 MONTHS<br/>26% APR</button>
                        </div>
                    </div>

                    <p className="text-white mb-2">Amount to Stake</p>

                    <div className="row px-1 mb-2">
                        <div className="col-lg-8 p-2">
                            <div className="position-relative">
                                <div className="position-absolute text-color-2 cursor-pointer" onClick={inputMaxBalance} style={{"top":"16px", "right":"20px"}}>MAX</div>
                                <input type="number" step="0" min="1" className="form-control form-control-1 ps-4 py-3" name="stakeAmount" placeholder="Enter Stake Amount" value={inputsValues.stakeAmount} onChange={handleInputChange} style={{"paddingRight":"70px"}} />
                            </div>
                        </div>

                        <div className="col-lg-4 p-2">
                            <button className="btn btn-custom-3 w-100 px-4 py-3" onClick={stake}>STAKE</button>
                        </div>
                    </div>

                    <p className="text-white mb-0">Balance: { inputsValues.balanceFormatted } KEY</p>
                </div>

                <div className="pb-5 px-1">
                    <p className="font-size-150 poppins font-weight-700 text-color-2 mb-3">Leaderboards</p>
                    <div className="table-responsive">
                        <table className="table text-color-2 mb-2 bg-white" style={{border: "1px solid #071c1f"}}>
                            <thead>
                                <tr className="">
                                    <th className="text-center align-middle p-3">Rank</th>
                                    <th className="text-center align-middle p-3">Address</th>
                                    <th className="text-center align-middle p-3">Amount Staked</th>
                                    <th className="text-center align-middle p-3">Accumulated Rewards</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                inputsValues.ranks.length > 0 ?
                                    inputsValues.ranks.map((rank, index) => (
                                <tr key={ index }>
                                    <td className="text-center align-middle p-3 text-end inter">{ index + 1 }</td>
                                    <td className="text-center align-middle p-3 text-end inter"><a href={'https://bscscan.com/address/' + rank.address} target="_blank" rel={'noreferrer'} className="text-white inter text-decoration-none">{ shortenAddress(6, 7, rank.address) }</a></td>
                                    <td className="text-center align-middle p-3 text-end inter">{ numberFormat(rank.staked_amount,true) } KEY</td>
                                    <td className="text-center align-middle p-3 text-end inter">{ numberFormat(rank.accumulated_rewards,true) } KEY</td>
                                </tr>
                                    ))
                                :
                                <tr>
                                    <td className="align-middle p-3 text-center" colSpan="12">No stakers yet.</td>
                                </tr>
                            }
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="pb-5 px-1">
                    <p className="font-size-150 poppins font-weight-700 text-color-2 mb-3">Stake History</p>
                    <div className="table-responsive">
                        <table className="table text-color-2 mb-2 bg-white" style={{border: "1px solid #071c1f"}}>
                            <thead>
                                <tr className="">
                                    <th className="text-center align-middle p-3">No.</th>
                                    <th className="text-center align-middle p-3">Amount</th>
                                    <th className="text-center align-middle p-3">Duration</th>
                                    <th className="text-center align-middle p-3">Started</th>
                                    <th className="text-center align-middle p-3">Accumulated Rewards</th>
                                    <th className="text-center align-middle p-3">Status</th>
                                    <th className="text-center align-middle p-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                inputsValues.stakes.length > 0 ?
                                    // false ?
                                    inputsValues.stakes.map((stake, index) => (
                                        <tr key={ index }>
                                            <td className="text-center align-middle p-3 text-end inter">{ stake.index + 1 }</td>
                                            <td className="text-center align-middle p-3 text-end inter">{ numberFormat(ethers.utils.formatUnits(stake.amount, 'ether'), false) } KEY</td>
                                            <td className="text-center align-middle p-3 text-end inter">{ stake.duration / 30 } Months</td>
                                            <td className="text-center align-middle p-3 text-end inter">{ new Date(stake.startTime * 1000).toLocaleDateString('en-US', {month: 'long', day: '2-digit', year: 'numeric'}) }</td>
                                            <td className="text-center align-middle p-3 inter text-end">{ numberFormat(ethers.utils.formatUnits(stake.reward, 'ether'), false) } KEY</td>
                                            <td className="text-center align-middle p-3 inter">{ (stake.claimed) ? 'Claimed' : ((Date.parse(new Date()) > Date.parse(new Date(stake.startTime * 1000)) + (stake.duration * 24 * 60 * 60 * 1000)) ? 'Completed' : 'Ongoing') }</td>
                                            <td className="text-center align-middle p-3 text-center">
                                                {
                                                    !stake.claimed &&
                                                    <button className="btn btn-custom-4 btn-sm px-3 py-2 w-100" onClick={() => unstake(stake.index, false)}>{ (Date.parse(new Date()) > Date.parse(new Date(stake.startTime * 1000)) + (stake.duration * 24 * 60 * 60 * 1000)) ? 'Claim' : 'Unstake' }</button>
                                                }
                                            </td>
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td className="align-middle p-3 text-center inter" colSpan="12">You have no stakes yet.</td>
                                    </tr>
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={showModalProcessing} onHide={handleCloseModalProcessing} className="" backdrop="static" keyboard={false} centered>
                <div className="modal-body p-4 py-5 p-sm-5">
                    <div className="text-center">
                        <div className="spinner-grow mb-3" style={{"width":"5rem", "height":"5rem"}} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mb-0 font-size-110 mb-2">Processing your transaction</p>
                    </div>
                </div>
            </Modal>

            <Modal show={showModalSuccess} onHide={handleCloseModalSuccess} className="" centered>
                <div className="modal-body p-4 py-5 p-sm-5 border-0">
                    <div className="text-center">
                        <i className="fas fa-check-circle font-size-400 text-color-2 mb-3"></i>
                        <p className="mb-0 font-size-110 mb-4 pb-2" id="success-message"></p>

                        <button className="btn btn-custom-3 px-5 py-2 font-size-110 mx-1" onClick={handleCloseModalSuccess}>Okay</button>
                    </div>
                </div>
            </Modal>

            <Modal show={showModalError} onHide={handleCloseModalError} className="" centered>
                <div className="modal-body p-4 py-5 p-sm-5">
                    <div className="text-center">
                        <i className="fas fa-times-circle font-size-400 text-color-2 mb-3"></i>
                        <p className="mb-0 font-size-110 mb-4 pb-2" id="error-message"></p>

                        <button className="btn btn-custom-3 px-5 py-2 font-size-110 mx-1" onClick={handleCloseModalError}>Close</button>
                    </div>
                </div>
            </Modal>

            <Modal show={showModalPenalty} onHide={handleCloseModalPenalty} className="" centered>
                <div className="modal-body p-4 py-5 p-sm-5">
                    <div className="text-center">
                        <i className="fas fa-exclamation-circle font-size-400 text-color-2 mb-3"></i>
                        <p className="mb-0 font-size-110 mb-4 inter pb-2">You are attempting to withdraw your stake ahead of the scheduled time, resulting in a penalty of <span>{ numberFormat(parseInt(ethers.utils.formatUnits(inputsValues.unstake.penalty, 'ether')), false) } KEY tokens</span>. After applying this penalty, you will receive a total of <span>{ numberFormat(inputsValues.unstake.totalWithdrawalAmount, false) } KEY tokens</span> from this withdrawal. Please review your decision to ensure that you understand the implications of this early withdrawal.</p>

                        <button className="btn btn-custom-3 inter px-3 px-sm-5 py-2 font-size-100 mx-1" onClick={handleCloseModalPenalty}>Cancel</button>
                        <button className="btn btn-custom-3 inter px-3 px-sm-5 py-2 font-size-100 mx-1" onClick={() => unstake(inputsValues.unstake.index, true)}>Proceed Anyway</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Home