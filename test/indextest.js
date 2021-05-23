const mocha=require('mocha');
const chai=require('chai');
const expect=require('chai').expect;
const server=require('../server');
const chaiHttp = require('chai-http');
//const { endianness } = require('node:os');

chai.should();
chai.use(chaiHttp);

describe("Testing the api response data which is received",()=> {
    after("Closing server",()=>{
        server.close();
    })
    it("To check ",()=> {
        chai.request(server)
        .get('/')
        .end((err, resp)=>{
            expect(resp).to.have.status(200);
        })
    })

})