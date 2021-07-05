const api_url=require("../urlsfile");
const chai = require("chai");
const expect = require("chai").expect;
const chaihttp = require("chai-http");

chai.should();
chai.use(chaihttp);

auth="Authorization"
let token="Bearer xfjfxjghghghfkudtsetawasrydyuk";
let object={};

describe("To check details of forbidden access",()=> {
    it("To Check the status 403 got superadmin access data",(done) => {
        chai.request(api_url.serverurls.server)
        .get(api_url.serverurls.Get_links[0])
        .set(auth,token)
        .end((err, resp) => {
            resp.should.have.status(401);
            resp.should.not.have.status(200);
            resp.body.should.be.empty;  
            done();    
        })
    })
    it("To Check the status 403 got unauthorized user access data",(done) => {
        chai.request(api_url.serverurls.server)
        .get(api_url.serverurls.Get_links[0])
        .set(auth,token)
        .end((err, resp) => {
            resp.should.have.status(401);
            resp.should.not.have.status(200);
            resp.body.should.be.empty;  
            done();   
        });
    });
});