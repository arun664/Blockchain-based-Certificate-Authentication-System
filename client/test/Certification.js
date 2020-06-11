const Certification = artifacts.require("./Certification.sol");
require('chai')
	.use(require('chai-as-promised'))
	.should()

contract('Certification', () => {
	let certification, cert,cert1
	before(async () => {
	certification= await Certification.deployed()
	})
	describe('deployment', async () =>{
	it('deploys Succesfully', async () =>{
	const address = await certification.address
		assert.notEqual(address, 0*0)
		assert.notEqual(address, '')
		assert.notEqual(address, null)
		assert.notEqual(address, undefined)
	})})
	describe('Certification', async () =>{
		it('generates a certificate', async () =>{
			cert =
			certification.generateCertificate('test','1KG16CS096','test','test@gmail.com','test’s father','CSE',[8,8,8,8,8,8,8,8],'09/05/1999')
		})
	})
	it('returns data', async ()=>{
	cert1 = certification.getData('test')
	})
})
