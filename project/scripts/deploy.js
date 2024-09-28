const hre = require("hardhat");
const {items} = require("../items.json")


const tokens = (n)=>{
    return hre.ethers.parseUnits(n.toString(),'ether');
}

async function main(){
    const [deployer] = await ethers.getSigners();
    const dappazon = await  hre.ethers.deployContract("Dappazon");
    await dappazon.waitForDeployment();

    console.log(dappazon.target);

    for(let i =0 ; i<items.length ; i++ ){
        const transaction = await dappazon.connect(deployer).list(
            items[i].id,
            items[i].name,
            items[i].category,
            items[i].image,
            tokens(items[i].price),
            items[i].rating,
            items[i].stock,
        )
        await transaction.wait();
        console.log(`Listed item ${items[i].id}: ${items[i].name}`)
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });