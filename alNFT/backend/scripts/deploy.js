async function main() {
    const Lychee = await ethers.getContractFactory("Lychee")
  
    // Start deployment, returning a promise that resolves to a contract object
    const lychee = await Lychee.deploy()
    await lychee.deployed()
    console.log("Contract deployed to address:", lychee.address)
}
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
})

