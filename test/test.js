const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log("Deploying contacs with account: ", deployer.address);
    console.log("Account Balance: ", accountBalance.toString());

    const simpleStorage = await hre.ethers.getContractFactory("SimpleStorage");
    const simpleStorage_contract = await simpleStorage.deploy();
    await simpleStorage_contract.deployed();
    console.log("Contract is deployed to: ", simpleStorage_contract.address);

    let sendInfo = await simpleStorage_contract.setData("Hi Rwitesh");
    await sendInfo.wait();

    let getInfo = await simpleStorage_contract.getData();
    console.log("Message:",getInfo);
    
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();