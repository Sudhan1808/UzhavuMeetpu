let ICO1Price;
let amount;
let ICO1Priceformatted;
let ICO1BalanceFormatted1;

function connectToWeb3() {
    // Load web3
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      web3Eth = web3.eth;
      window.ethereum.enable().then(() => {
        // Code to execute after user has connected to Web3
        console.log("Web3 connection successful");
        document.getElementById("connect-button").innerText = "Connected"; // Change button text to "Connected"
      }).catch((error) => {
        console.error("Web3 connection error:", error);
      });
    } else if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      web3Eth = web3.eth;
      // Code to execute if the user is already connected to Web3
      console.log("Web3 already connected");
      document.getElementById("connect-button").innerText = "Connected"; // Change button text to "Connected"
    } else {
      console.error("No web3 provider detected");
      return;
    }
  }  

document.getElementById("connect-button").addEventListener("click", connectToWeb3);
window.addEventListener('load', async () => {
    const bnbendpoint = 'https://bsc-dataseed.binance.org/';
    const web3 = new Web3(new Web3.providers.HttpProvider(bnbendpoint));
 
   // Initialize web3.eth and eth
     const contractAddress = "0x8c3d868A6e683De4006Bb9E07fb452aDDFcF3784"; // replace with the contract address
     const contractAbi = [
        {
            "inputs": [
                {
                    "internalType": "address[]",
                    "name": "recipients",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                }
            ],
            "name": "airdrop",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address[]",
                    "name": "recipients",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                }
            ],
            "name": "batchTransfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "burn",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "Burn",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenAmount",
                    "type": "uint256"
                }
            ],
            "name": "buyTokens",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "claimOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "pause",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "Paused",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "unpause",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "Unpaused",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "withdrawFunds",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "withdrawRemainingTokens",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getICO1PriceInBNB",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getICO1RemainingTokens",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getICO2PriceInBNB",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getICO2RemainingTokens",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getLatestPrice",
            "outputs": [
                {
                    "internalType": "int256",
                    "name": "",
                    "type": "int256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "ICO1EndTime",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "ICO1Price",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "ICO1StartTime",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "ICO1Supply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "ICO2EndTime",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "ICO2Price",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "ICO2StartTime",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "ICO2Supply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "newOwner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "paused",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "remainingICO1Supply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "remainingICO2Supply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
     const contract = new web3.eth.Contract(contractAbi, contractAddress);
    try {
  const name = await contract.methods.name().call();
  const symbol = await contract.methods.symbol().call();
  const supplyformatted = await contract.methods.totalSupply().call();
  const supply = supplyformatted / 10**8;
  // Fetch ICO1 information
  const ICO1StartTime = await contract.methods.ICO1StartTime().call();
  const ICO1EndTime = await contract.methods.ICO1EndTime().call();
  const ICO1Supply = await contract.methods.ICO1Supply().call();
        ICO1Price = await contract.methods.getICO1PriceInBNB().call();      
  const ICO1Balance = await contract.methods.getICO1RemainingTokens().call();
        ICO1BalanceFormatted1 = (Number(ICO1Balance) / 10**8).toFixed(0);
  const ICO1ValueSold = 200000000 - ICO1BalanceFormatted1;
  const ICO1BalanceFormatted = ICO1ValueSold.toLocaleString();
        ICO1Priceformatted =  (ICO1Price / 10**8).toFixed(8);   
  // Fetch ICO2 information
  const ICO2StartTime = await contract.methods.ICO2StartTime().call();
  const ICO2EndTime = await contract.methods.ICO2EndTime().call();
  const ICO2Supply = await contract.methods.ICO2Supply().call();
  const ICO2Price = await contract.methods.getICO2PriceInBNB().call();
  // Update UI
  const nameValueEl = document.getElementById("namevalue");
  const symbolEl = document.getElementById("symbolvalue");
  const totSupply = document.getElementById("totsupplyvalue");
  // Update UI
  const ICO1StartEl = document.getElementById("ICO1Start");
  const ICO1EndEl = document.getElementById("ICO1End");
  const ICO1SupplyEl = document.getElementById("ICO1Supply");
  const ICO1PriceBNBEl = document.getElementById("ICO1PriceBNB");
  const ICO1BalanceEl = document.getElementById("ICO1Balance");
  const ICO2StartEl = document.getElementById("ICO2Start");
  const ICO2EndEl = document.getElementById("ICO2End");
  const ICO2SupplyEl = document.getElementById("ICO2Supply");
  const ICO2PriceEl = document.getElementById("ICO2Price");
  nameValueEl.innerText = name;
  symbolEl.innerText = symbol;
  totSupply.innerText = supply.toLocaleString();
  ICO1StartEl.innerText = `ICO1 Start Time: ${new Date(ICO1StartTime * 1000).toLocaleString()}`;
  ICO1EndEl.innerText = `ICO1 End Time: ${new Date(ICO1EndTime * 1000).toLocaleString()}`;
  ICO1SupplyEl.innerText = `ICO1 Supply: ${ICO1Supply}`;
  ICO1PriceBNBEl.innerText = `${(ICO1Priceformatted)} BNB`;
  ICO1BalanceEl.innerText = `Tokens Sold : ${ICO1BalanceFormatted.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} / 200,000,000`;
  ICO2StartEl.innerText = `ICO2 Start Time: ${new Date(ICO2StartTime * 1000).toLocaleString()}`;
  ICO2EndEl.innerText = `ICO2 End Time: ${new Date(ICO2EndTime * 1000).toLocaleString()}`;
  ICO2SupplyEl.innerText = `ICO2 Supply: ${ICO2Supply}`;
  ICO2PriceEl.innerText = `ICO2 Price: ${web3.utils.fromWei(ICO2Price)} ETH`;

// Fetch ETH/USD price from Coingecko API
const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd");
const data = await response.json();
const bnbPrice = data.binancecoin.usd;
console.log("BNB Price in USD:", bnbPrice);

// Get elements
const usdToSpendInput = document.getElementById('usdToSpend');
const bnbToBuyOutput = document.getElementById('bnbToBuy');
const tokensToBuyOutput = document.getElementById('tokensToBuy');

bnbToBuyOutput.textContent = `Cost in BNB to buy: 0.000000`;
tokensToBuyOutput.textContent = `Number of tokens receiveable: 0`;

usdToSpendInput.addEventListener("input", () => {
    const usdToSpend = parseFloat(usdToSpendInput.value);
    const maxUsdToSpend = ((ICO1BalanceFormatted1) * 0.0015).toFixed(0);
     

    if (usdToSpend > maxUsdToSpend) {
        const message = `The maximum amount you can spend is ${maxUsdToSpend}. Please enter a lower amount.`;
        alert(message);
        usdToSpendInput.value = maxUsdToSpend;
    }

    const tokensToBuy = usdToSpend / 0.0015;
    const bnbToBuy = tokensToBuy * ICO1Priceformatted;

    bnbToBuyOutput.textContent = `Cost in BNB to buy: ${bnbToBuy.toFixed(6)}`;
    tokensToBuyOutput.textContent = `Number of tokens receiveable: ${tokensToBuy.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
});
}
catch (err) {
    console.error(err);
  }
});

// Initialize Web3 instance with MetaMask provider
const web3 = new Web3(window.ethereum);

const contractAbi = [
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "recipients",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "amounts",
				"type": "uint256[]"
			}
		],
		"name": "airdrop",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "recipients",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "amounts",
				"type": "uint256[]"
			}
		],
		"name": "batchTransfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Burn",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenAmount",
				"type": "uint256"
			}
		],
		"name": "buyTokens",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claimOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "pause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Paused",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "unpause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Unpaused",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "withdrawFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawRemainingTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getICO1PriceInBNB",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getICO1RemainingTokens",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getICO2PriceInBNB",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getICO2RemainingTokens",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLatestPrice",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ICO1EndTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ICO1Price",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ICO1StartTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ICO1Supply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ICO2EndTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ICO2Price",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ICO2StartTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ICO2Supply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "newOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "remainingICO1Supply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "remainingICO2Supply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = "0x8c3d868A6e683De4006Bb9E07fb452aDDFcF3784";
// Create contract instance
const contract = new web3.eth.Contract(contractAbi, contractAddress);

// Function to handle the token purchase
async function buyTokens(amount) {
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
        // Request user permission to connect and retrieve accounts
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
  
        // Calculate the price in Ether for the specified token amount
        const totalPrice = Math.floor((amount * (ICO1Priceformatted*(10**18)))/ 10**8) ;
        console.log( totalPrice);
        console.log(ICO1Priceformatted)
  
        // Send transaction to the buy function with the specified amount and price
        const transaction = contract.methods.buyTokens(amount).send({
          from: account,
          value: totalPrice,
        });
  
        // Wait for the transaction to be mined
        const receipt = await transaction;
  
        console.log(receipt);
        // Refresh the user's token balance or perform any other necessary action
      } else {
        console.error('MetaMask not detected');
      }
    } catch (error) {
      console.error('An error occurred during the transaction:', error);
    }
    }

    const buyButton = document.getElementById('buyToken');
    const modal = document.getElementById('BuyModal');
    const continueButton = document.getElementById('continueButton');

    // Open the modal when the button is clicked
    buyButton.addEventListener('click', () => {
    modal.style.display = 'block';
    });

    // Close the modal when the continue button is clicked
    continueButton.addEventListener('click', async () => {
     modal.style.display = 'none';
  
      const usdToSpendInput = document.getElementById('usdToSpend');
        const usdVal = parseFloat(usdToSpendInput.value);
        const famount = usdVal / 0.0015;
              amount = (famount * (10**8)).toFixed(0);
  
        console.log(amount);
        await buyTokens(amount);
    });

    // Close the modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
    }); 

const countdown = document.querySelector('#countdown');
const daysCountdown = countdown.querySelector('#days');
const hoursCountdown = countdown.querySelector('#hours');
const minutesCountdown = countdown.querySelector('#minutes');
const secondsCountdown = countdown.querySelector('#seconds');

// Set the target date (10/05/2023 at midnight)
const targetDate = new Date('2023-07-05T00:00:00');

// Update the countdown every second
setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the countdown
  daysCountdown.textContent = days;
  hoursCountdown.textContent = hours.toString().padStart(2, '0');
  minutesCountdown.textContent = minutes.toString().padStart(2, '0');
  secondsCountdown.textContent = seconds.toString().padStart(2, '0');
}, 1000);

  const homebox1 = document.getElementById("homebox1");
const homebox2 = document.getElementById("homebox2");
const homebox3 = document.getElementById("homebox3");
const homebox4 = document.getElementById("homebox4");
const homebox1title = document.getElementById("homebox1title");
const homebox2title = document.getElementById("homebox2title");
const homebox3title = document.getElementById("homebox3title");
const homebox4title = document.getElementById("homebox4title");

homebox1title.classList.add("active");
fadeIn(homebox1);
homebox2.style.display = "none";
homebox3.style.display = "none";
homebox4.style.display = "none";

const fadeDuration = 1000; 
homebox1title.addEventListener("click", () => {
  fadeOut(homebox2);
  fadeOut(homebox3);
  fadeOut(homebox4);
  fadeIn(homebox1);
  setActive(homebox1title);
});

homebox2title.addEventListener("click", () => {
  fadeOut(homebox1);
  fadeOut(homebox3);
  fadeOut(homebox4);
  fadeIn(homebox2);
  setActive(homebox2title);
});

homebox3title.addEventListener("click", () => {
  fadeOut(homebox1);
  fadeOut(homebox2);
  fadeOut(homebox4);
  fadeIn(homebox3);
  setActive(homebox3title);
});

homebox4title.addEventListener("click", () => {
  fadeOut(homebox1);
  fadeOut(homebox2);
  fadeOut(homebox3);
  fadeIn(homebox4);
  setActive(homebox4title);
});

function fadeIn(element) {
    element.style.opacity = 0;
    element.style.display = "flex";
    let opacity = 0;
    const startTime = performance.now();
    function updateOpacity(timestamp) {
      const elapsed = timestamp - startTime;
      opacity = elapsed / fadeDuration;
      if (opacity > 1) {
        opacity = 1;
      }
      element.style.opacity = opacity;
      if (opacity < 1) {
        requestAnimationFrame(updateOpacity);
      }
    }
    requestAnimationFrame(updateOpacity);
  }
  
  function fadeOut(element) {
    let opacity = 1;
    const startTime = performance.now();
    function updateOpacity(timestamp) {
      const elapsed = timestamp - startTime;
      opacity = 1 - elapsed / fadeDuration;
      if (opacity < 0) {
        opacity = 0;
      }
      element.style.opacity = opacity;
      if (opacity > 0) {
        requestAnimationFrame(updateOpacity);
      } else {
        element.style.display = "none";
      }
    }
    requestAnimationFrame(updateOpacity);
  }

function setActive(titleElement) {
  const titleElements = [homebox1title, homebox2title, homebox3title, homebox4title];
  titleElements.forEach((element) => {
    element.classList.remove("active");
  });
  titleElement.classList.add("active");
}

  document.getElementById("cont-address").addEventListener("click", function() {
    var addressElement = document.getElementById("cont-address");
    var address = addressElement.getElementsByTagName("b")[0].innerText;
    var copyIcon = document.getElementById("footer-copy");
  
    // Create a temporary input element
    var tempInput = document.createElement("input");
    tempInput.value = address;
    document.body.appendChild(tempInput);
  
    // Copy the address to the clipboard
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  
    // Update the UI to indicate that the address has been copied
    addressElement.getElementsByTagName("b")[0].innerText = "Address Copied!";
    copyIcon.style.display = "none";  
    // Revert back to the original address after 5 seconds
    setTimeout(function() {
      addressElement.getElementsByTagName("b")[0].innerText = address;
      copyIcon.style.display = "inline";  
      // Clear the "Address Copied" message after another 5 seconds
     
    }, 1300);
  });

  document.getElementById("token-address").addEventListener("click", function() {
    var addressElement = document.getElementById("token-address");
    var address = addressElement.getElementsByTagName("b")[0].innerText;
  
    // Create a temporary input element
    var tempInput = document.createElement("input");
    tempInput.value = address;
    document.body.appendChild(tempInput);
  
    // Copy the address to the clipboard
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  
    // Update the UI to indicate that the address has been copied
    addressElement.getElementsByTagName("b")[0].innerText = "Address Copied!";
  
    // Revert back to the original address after 5 seconds
    setTimeout(function() {
      addressElement.getElementsByTagName("b")[0].innerText = address;
  
      // Clear the "Address Copied" message after another 5 seconds
     
    }, 1300);
  });

  var currentContent = 1; // Variable to keep track of the currently visible content
  var totalContents = 5; // Total number of contents
  var timeoutId; // Variable to store the timeout ID
  var intervalId; // Variable to store the interval ID
// Function to toggle the content based on the given index
function toggleContent(index) {
    if (index !== currentContent) {
        hideContent(currentContent);
        showContent(index);
        currentContent = index;
    }
    // Reset the timer
    resetTimer();
}
// Function to hide the content with the given index
function hideContent(index) {
    var content = document.getElementById('indexcont0' + index);
    if (content) {
        content.classList.remove('fade-in'); // Remove fade-in class
        content.classList.add('fade-out'); // Add fade-out class
        setTimeout(function () {
            content.style.display = 'none';
        }, 1300); // Delay hiding the content to match the fade-out animation duration
    }
}

function showContent(index) {
    var content = document.getElementById('indexcont0' + index);
    if (content) {
        content.classList.remove('fade-out'); // Remove fade-out class
        setTimeout(function () {
            content.classList.add('fade-in'); 
            content.style.display = 'block';// Add fade-in class
        },700 ); // Delay showing the content to match the fade-in animation duration
    }
}

// Show the initial content on page load
showContent(currentContent);

// Function to automatically toggle the content with time
function autoToggleContent() {
    var nextContent = currentContent === totalContents ? 1 : currentContent + 1;
    toggleContent(nextContent);
}
// Function to reset the timer
function resetTimer() {
    clearTimeout(timeoutId);
    clearInterval(intervalId);
    timeoutId = setTimeout(function() {
        autoToggleContent(); // Initial toggle
        intervalId = setInterval(autoToggleContent, 9000); // Subsequent toggles every 5 seconds
    }, 9000);
}           
// Set an interval to automatically toggle content every 5 seconds (5000 milliseconds)
intervalId = setInterval(autoToggleContent, 9000);


function updateProgressBar() {
  const progressBar = document.getElementById('progress-bar');
  const maxAmount = 200000000;
  const progress = ((200000000 - ICO1BalanceFormatted1) / maxAmount) * 100;
  console.log(ICO1BalanceFormatted1);
  progressBar.style.width = progress + '%';
}

// Call the updateProgressBar function whenever needed
updateProgressBar();
setInterval(updateProgressBar, 10000);



(function() {

    var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

    // Main
    initHeader();
    initAnimation();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: width/2, y: height/2};

        largeHeader = document.getElementById('large-header');
        largeHeader.style.height = height+'px';

        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create points
        points = [];
        for(var x = 0; x < width; x = x + width/20) {
            for(var y = 0; y < height; y = y + height/20) {
                var px = x + Math.random()*width/20;
                var py = y + Math.random()*height/20;
                var p = {x: px, originX: px, y: py, originY: py };
                points.push(p);
            }
        }

        // for each point find the 5 closest points
        for(var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for(var j = 0; j < points.length; j++) {
                var p2 = points[j]
                if(!(p1 == p2)) {
                    var placed = false;
                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // assign a circle to each point
        for(var i in points) {
            var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,1)');
            points[i].circle = c;
        }
    }

    // Event handling
    function addListeners() {
        if(!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
        var posx = posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY)    {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;
    }

    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
    }

    // animation
    function initAnimation() {
        animate();
        for(var i in points) {
            shiftPoint(points[i]);
        }
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in points) {
                // detect points in range
                if(Math.abs(getDistance(target, points[i])) < 4000) {
                    points[i].active = 0.3;
                    points[i].circle.active = 0.6;
                } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                    points[i].active = 0.1;
                    points[i].circle.active = 0.3;
                } else if(Math.abs(getDistance(target, points[i])) < 40000) {
                    points[i].active = 0.02;
                    points[i].circle.active = 0.1;
                } else {
                    points[i].active = 0;
                    points[i].circle.active = 0;
                }

                drawLines(points[i]);
                points[i].circle.draw();
            }
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
            y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
            onComplete: function() {
                shiftPoint(p);
            }});
    }

    // Canvas manipulation
    function drawLines(p) {
        if(!p.active) return;
        for(var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
            ctx.stroke();
        }
    }

    function Circle(pos,rad,color) {
        var _this = this;

        // constructor
        (function() {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function() {
            if(!_this.active) return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
            ctx.fill();
        };
    }

    // Util
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
    
})();
 
  // Event listener for scroll event
  window.addEventListener('scroll', handleScroll);
     
  const homeValue01 = document.getElementById('homeValue01');
  const homeValue02 = document.getElementById('homeValue02');
  const homeValue03 = document.getElementById('homeValue03');
  const homeValue04 = document.getElementById('homeValue04');
  const homeValue05 = document.getElementById('homeValue05');
  
  homeValue01.addEventListener('click', () => {
    homeValue01.classList.toggle('active');
    homeValue02.classList.remove('active');
    homeValue03.classList.remove('active');
    homeValue04.classList.remove('active');
    homeValue05.classList.remove('active');
  });
  homeValue02.addEventListener('click', () => {
    homeValue02.classList.toggle('active');
    homeValue01.classList.remove('active');
    homeValue03.classList.remove('active');
    homeValue04.classList.remove('active');
    homeValue05.classList.remove('active');
  });
  homeValue03.addEventListener('click', () => {
    homeValue03.classList.toggle('active');
    homeValue01.classList.remove('active');
    homeValue02.classList.remove('active');
    homeValue04.classList.remove('active');
    homeValue05.classList.remove('active');
  });  
  homeValue04.addEventListener('click', () => {
    homeValue04.classList.toggle('active');
    homeValue01.classList.remove('active');
    homeValue02.classList.remove('active');
    homeValue03.classList.remove('active');
    homeValue05.classList.remove('active');
  });  
  homeValue05.addEventListener('click', () => {
    homeValue05.classList.toggle('active');
    homeValue01.classList.remove('active');
    homeValue02.classList.remove('active');
    homeValue03.classList.remove('active');
    homeValue04.classList.remove('active');
  });  
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      homeValue01.classList.remove('active');
      homeValue02.classList.remove('active');
      homeValue03.classList.remove('active');
      homeValue04.classList.remove('active');
      homeValue05.classList.remove('active');
    }
  });
  
// Get the elements representing the values
const farmerNumElement = document.querySelector('.farmerNum');
const coveredAreaElement = document.querySelector('.coveredArea');
const reduceFertilizerElement = document.querySelector('.reducefertilizer');
const reduceElecElement = document.querySelector('.reduceElec');
const yieldIncreaseElement = document.querySelector('.yieldIncrease');
const profitIncreaseElement = document.querySelector('.profitIncrease');

// Set the target values
const farmerNumTarget = 189;
const coveredAreaTarget = 237;
const reduceFertilizerTarget = 810;
const reduceElecTarget = 758;
const yieldIncreaseTarget = 612;
const profitIncreaseTarget = 1327560;

// Function to animate the value increase
// Function to animate the value increase
function animateValue(element, start, end, duration) {
    let current = start;
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    const startTime = performance.now();
    
    function updateValue(timestamp) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      current = start + increment * Math.floor(range * progress);
      element.textContent = current;
  
      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    }
  
    requestAnimationFrame(updateValue);
  }
// Call the animateValue function for each element
const duration = 2500; // Shared duration for all animations

animateValue(farmerNumElement, 0, farmerNumTarget, duration);
animateValue(coveredAreaElement, 0, coveredAreaTarget, duration);
animateValue(reduceFertilizerElement, 0, reduceFertilizerTarget, duration);
animateValue(reduceElecElement, 0, reduceElecTarget, duration);
animateValue(yieldIncreaseElement, 0, yieldIncreaseTarget, duration);
animateValue(profitIncreaseElement, 0, profitIncreaseTarget, duration);

// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Function to handle scroll event
  function handleScroll() {
    if (isInViewport(farmerNumElement)) {
      animateValue(farmerNumElement, 0, farmerNumTarget, duration);
    }
    if (isInViewport(coveredAreaElement)) {
      animateValue(coveredAreaElement, 0, coveredAreaTarget, duration);
    }
    if (isInViewport(reduceFertilizerElement)) {
      animateValue(reduceFertilizerElement, 0, reduceFertilizerTarget, duration);
    }
    if (isInViewport(reduceElecElement)) {
      animateValue(reduceElecElement, 0, reduceElecTarget, duration);
    }
    if (isInViewport(yieldIncreaseElement)) {
      animateValue(yieldIncreaseElement, 0, yieldIncreaseTarget, duration);
    }
    if (isInViewport(profitIncreaseElement)) {
      animateValue(profitIncreaseElement, 0, profitIncreaseTarget, duration);
    }
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
  
  



  


  
  
  
  
  
  
  
  
  
  