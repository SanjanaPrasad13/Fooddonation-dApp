web3= new Web3(window.web3.currentProvider); 
var contractAddress='0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8';
var decentralized_address_p = document.getElementById('decentralized_address');
var abi;
var currentAccount;
//var current_account_position;

var c_abi;
var foodDonationContract;
var claims;

if(window.ethereum) {
    window.ethereum.on('accountsChanged', function () {
        window.location.reload();
    });
}

async function getCurrentAccount(){
    const acc = await ethereum.request({ method: 'eth_requestAccounts'});
    return acc[0];
}



const btn = document.getElementById('btn');
const reci_btn = document.getElementById('recipient_btn');

const donor_reg_btn = document.getElementById('btn_reg')
const donor_unreg_btn = document.getElementById('btn_unreg')
const donation_btn = document.getElementById('donate')

const rec_reg_btn = document.getElementById('btn_reg_rec');
const rec_unreg_btn = document.getElementById('btn_unreg_rec')
const claim_btn = document.getElementById('claim')

const fund_btn = document.getElementById('fund_btn')





    c_abi=[
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "aId",
                    "type": "address"
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
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "subtractedValue",
                    "type": "uint256"
                }
            ],
            "name": "decreaseAllowance",
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
                    "name": "aId",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "foodType",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "foodPref",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "quantity",
                    "type": "uint256"
                }
            ],
            "name": "donateFood",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
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
                    "name": "addedValue",
                    "type": "uint256"
                }
            ],
            "name": "increaseAllowance",
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
                    "name": "aId",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "foodPref",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "foodType",
                    "type": "string"
                }
            ],
            "name": "receiveFood",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "aId",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "role",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "phNo",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "f_address",
                    "type": "string"
                }
            ],
            "name": "register_claimant",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "aId",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "role",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "phNo",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "mailId",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "f_address",
                    "type": "string"
                }
            ],
            "name": "register_donor",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
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
                    "name": "amount",
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
                    "name": "amount",
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
                    "name": "aId",
                    "type": "address"
                }
            ],
            "name": "transferHope",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "aId",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "role",
                    "type": "uint256"
                }
            ],
            "name": "unregister",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "admin",
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
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "spender",
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
                    "name": "account",
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
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "claimsList",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "cId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "aId",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "foodPref",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "foodType",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "quantity",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "received",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "defaultQuantity",
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
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "FoodDonorsList",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "bool",
                    "name": "registered",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "phNo",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "mailId",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "foodPref",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "foodType",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "quantity",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "f_address",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "t_Id",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "rewards",
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
            "name": "processed",
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
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "ReceiversList",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "bool",
                    "name": "registered",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "phNo",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "foodPref",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "foodType",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "f_address",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "request_id",
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
            "name": "retrieveAllRequests",
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
                    "internalType": "uint256",
                    "name": "cId",
                    "type": "uint256"
                }
            ],
            "name": "retrieveRequest",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
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
            "inputs": [
                {
                    "internalType": "address",
                    "name": "aId",
                    "type": "address"
                }
            ],
            "name": "retrieveRequestId",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
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
            "name": "tokens",
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
            "name": "totalFood",
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
            "name": "totalNonVegFood",
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
            "name": "totalNPNonVegFood",
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
            "name": "totalNPVeganFood",
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
            "name": "totalNPVegFood",
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
        },
        {
            "inputs": [],
            "name": "totalVeganFood",
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
            "name": "totalVegFood",
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
            "name": "VisitorsList",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
    foodDonationContract = new web3.eth.Contract(c_abi,contractAddress);
    getCurrentAccount().then((value)=>{decentralized_address_p.innerHTML+=value; currentAccount = value;})






function updateDecentralizedAddress() {


    getCurrentAccount().then((value)=>{document.getElementById('decentralized_address_donate').innerHTML+=value; currentAccount = value; getClaimDetails();});


    //document.getElementById('decentralized_address_donate').innerHTML = currentAccount;
  }
function register_claimant(name, phNo,Address){
    console.log("register receiver");
    var success=1;
    var tmp = async function(){ 
        try{
            console.log("inside try");
            return await foodDonationContract.methods.register_claimant(currentAccount, name, 1, phNo,Address).send({from:currentAccount});
        } 
        catch(e){
            success=0;
            console.log(e);
            alert(" Transaction failed!");
        }
    }
    tmp().then((val)=>{
        console.log(val);
        if(success==1){
            alert(" Transaction Success!");
        }
    });    
}




function donateFood(name,foodType,foodPref, quantity){
    console.log("register_donor ");
    var success=1;
    var tmp = async function(){ 
        try{
            console.log("inside try");
            // role_bytes32 = web3.utils.padLeft(web3.utils.asciiToHex(role), 64);
            console.log("data from Ui"+  currentAccount,name,foodPref,foodType);
            return await foodDonationContract.methods.donateFood(currentAccount,name,foodType,foodPref,quantity).send({from:currentAccount});
        } 
        catch(e){
            console.log("inside catch");
            console.log(e)
            success=0;
            alert("Please Register to donate.Transaction failed!");
        }
    }
    tmp().then((val)=>{
        console.log(val);
        if(success==1){
            alert("You have successfully made the donation. Transaction Success");
        }
    });    
}

function unregister(role){
    console.log("unregistering donor ");
    var success=1;
    var tmp = async function(){ 
        try{
            return await foodDonationContract.methods.unregister(currentAccount, role).send({from:currentAccount});
        } 
        catch(e){
            console.log(e);
            success=0;
            alert("Transaction failed");
        }
    }
    tmp().then((val)=>{
        console.log(val);
        if(success==1){
            alert("Success");
        }
    }); 
}

function receiveFood(name,foodPref,foodType){
        console.log("register_ app claimfood ");
        var success=1;
        var tmp = async function(){ 
            try{
                console.log("inside app try", currentAccount,name,foodPref,foodType);
                return await foodDonationContract.methods.receiveFood(currentAccount,name,foodPref,foodType).send({from:currentAccount});
            } 
            catch(e){
                console.log("inside app catch");
                console.log(e)
                success=0;
                alert("Transaction failed! Please Register to proceed");
            }
        }
        tmp().then((val)=>{
            console.log(val);
            if(success==1){
                alert("Transaction Success! Your claim will be processed!");
            }
    });  

}











async function recordClaimCreation(customer_insurance_company_id, customer_hospital_id, customer_n_tokens){
    var success=1;
    var tmp = async function(){ 
        try{
            return await foodDonationContract.methods.createClaim(customer_insurance_company_id, customer_hospital_id, customer_n_tokens).send({from:currentAccount});
        } 
        catch(e){
            success=0;
            alert("Transaction failed");
        }
    }
    return tmp().then((response)=>{
        return_val = response.events.returnEvent.returnValues.val;
        console.log(return_val);
        if(success==1){
            alert("success");
            return return_val;
            }
        }); 
}

async function saveClaimDetails(){
    var customer_name = document.getElementById("customer_name").value;
    var customer_insurance_company_id = document.getElementById("customer_insuranceCompany").value;
    var customer_hospital_id = document.getElementById("customer_hospital").value;
    var customer_description = document.getElementById("customer_description").value;
    var customer_n_tokens = document.getElementById("customer_n_tokens").value;


    var generated_id = recordClaimCreation(customer_insurance_company_id, customer_hospital_id, customer_n_tokens).then((generated_id)=>{
        var claimJSON  = {};
        var db_id = currentAccount+'_'+generated_id;
        claimJSON[db_id] = {
            customer_address: currentAccount,
            name: customer_name,
            desc : customer_description,
            insuranceCompany : customer_insurance_company_id,
            hospital : customer_hospital_id,
            tokens: customer_n_tokens
        }
        uploadJSONData(claimJSON)
    });
    

    // uploadJSONData(claimJSON).then((generatedId)=>{
    //     recordClaimCreation(customer_insurance_company_id, customer_hospital_id, customer_n_tokens, generatedId);
    // });
}

async function getClaimDetails(){
    
    insuranceCompanyAddress = currentAccount;
    url="getAllClaims/"+insuranceCompanyAddress;
    console.log(url);
    try {
        const config = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
        await fetch(url, config).then(response => response.json())
            .then(data => {
                console.log(data);
                delete claims;
                claims = data;
                delete claims["next_id"]
                populateClaims();
            }).catch(()=>{
            ///Exception occured do something
        });

    } catch (error) {
            alert("Something went wrong");
    }
    
}


async function repopulateClaims(){
    console.log("repopulating claims");
    var claims_box = document.getElementById("claimsBox");
    claims_box.innerHTML = ""
    claims_box.innerHTML = `<div class="form-group row">
    <label for="ID" class="col-sm-1 col-form-label">ID</label>
    <label for="Address" class="col-sm-2 col-form-label">Address</label>
    <label for="Name" class="col-sm-1 col-form-label">Name</label>
    <label for="InsuranceCompany" class="col-sm-1 col-form-label">Insurance Company</label>
    <label for="Hospital" class="col-sm-1 col-form-label">Hospital</label>
    <label for="Description" class="col-sm-2 col-form-label">Description</label>
    <label for="Tokens" class="col-sm-2 col-form-label">Tokens</label>
    <label for="blank" class="col-sm-1 col-form-label"></label>
    <label for="blank" class="col-sm-1 col-form-label"></label>
</div>`;
    await getClaimDetails();
}

function populateClaims(){
    console.log("populating claims");
    var claims_box = document.getElementById("claimsBox");
    
    var allKeys= Object.keys(claims);
    console.log(allKeys);
    for (let i = 0; i < allKeys.length; i++) {
        console.log(claims[allKeys[i]]);
        claims_box.innerHTML += `<div class="form-group row claim_row">
        <label for="ID" class="col-sm-1 col-form-label" id="claim_row_id_`+allKeys[i]+`">
        `+allKeys[i]+`</label>
        <label for="ID" class="col-sm-2 col-form-label" id="claim_row_address_`+allKeys[i]+`">
        `+claims[allKeys[i]].customer_address+`</label>
        <label for="Name" class="col-sm-1 col-form-label" id="claim_row_name_`+allKeys[i]+`">`+claims[allKeys[i]].name+`</label>
        <label for="InsuranceCompany" class="col-sm-1 col-form-label" id="claim_row_insurance_`+allKeys[i]+`">`+claims[allKeys[i]].insuranceCompany+`</label>
        <label for="Hospital" class="col-sm-1 col-form-label" id="claim_row_hospital_`+allKeys[i]+`">`+claims[allKeys[i]].hospital+`</label>
        <label for="Description" class="col-sm-1 col-form-label" id="claim_row_desc_`+allKeys[i]+`">`+claims[allKeys[i]].desc+`</label>
        <label for="Tokens" class="col-sm-2a col-form-label" id="claim_row_tokens_`+allKeys[i]+`">`+claims[allKeys[i]].tokens+`</label>
        <button class="btn btn-primary " style="margin-left: 80px !important;max-height: 40px;margin-top:5px" onclick="processClaim(this.id,'genuine')" id="claim_row_approve_`+allKeys[i]+`">Approve claim</button>
        <button class="btn btn-primary " style="margin-left: 80px !important;max-height: 40px;margin-top:5px" onclick="processClaim(this.id,'fraud')" id="claim_row_report_fraud_`+allKeys[i]+`">Report Fraud claim</button>
    </div>`;
    }

}

async function processClaim(clicked_id, type){
    current_request_id = clicked_id.split("_").at(-1);

    var name = document.getElementById("claim_row_name_"+current_request_id).textContent;
    var customer_address = document.getElementById("claim_row_address_"+current_request_id).textContent.trim();
    var InsuranceCompany = document.getElementById("claim_row_insurance_"+current_request_id).textContent.trim();
    var Hospital = document.getElementById("claim_row_hospital_"+current_request_id).textContent.trim();
    var desc = document.getElementById("claim_row_desc_"+current_request_id).textContent;
    var tokens = document.getElementById("claim_row_tokens_"+current_request_id).textContent.trim()+"00";

    console.log(name); 
    console.log(customer_address);
    console.log(desc);
    console.log(tokens);
    

    var success=1;
    var tmp = async function(){  
        try{
            //return await foodDonationContract.methods.approveValidClaim(customer_address, 1, desc, tokens).send({from:currentAccount});
            if(type=="fraud"){
                return await foodDonationContract.methods.processClaim(customer_address,Hospital,  1, tokens, current_request_id).send({from:currentAccount});
            }
            else{
                return await foodDonationContract.methods.processClaim(customer_address,Hospital,  0, tokens, current_request_id).send({from:currentAccount});
            }
        } 
        catch(e){
            console.log(e);
            success=0;
            alert("Transaction failed");
        }
    }
    tmp().then((val)=>{
        console.log(val);
        if(success==1){
            removeClaim(current_request_id);
            alert("Success");
        }
    }); 
}

async function removeClaim(current_request_id){
    var customer_address = document.getElementById("claim_row_address_"+current_request_id).textContent.trim();
    
    url="removeClaimDetails/"+customer_address;
    console.log(JSON.stringify(current_request_id));
    var deleteIdJSON = {}
    deleteIdJSON[current_request_id] = {}

    try {
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deleteIdJSON)
        }
        const response = await fetch(url, config)
        if (response.ok) {
            console.log("claim removed");
            repopulateClaims()
            return response
        } else {
            console.log("claim not removed");
            //
        }
    } catch (error) {
        console.log("claim not removed");
    }

}


