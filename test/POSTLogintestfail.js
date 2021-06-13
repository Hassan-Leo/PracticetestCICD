const chai = require("chai");
const expect = require("chai").expect;
const chaihttp = require("chai-http");
const api_url= require("../urlsfile")

chai.should();
chai.use(chaihttp);

let object={}

describe("When the authorization is failed for Super Admin, Admin and Issuer", () =>{
    before(function(done){
        chai.request(api_url.serverurls.server)
        .post(api_url.serverurls.Post_links[0])
        .send(api_url.serverurls.raw_fail[0])
        .end((err,resp)=>{
            object=resp;
            done();
        })
    })
    it("Response should have status 401 and be a object with wrong email", (done) =>{
        expect(object).to.be.json;
        expect(object).to.have.status(401);
        expect(object).to.not.have.status(200);
        expect(object).to.be.a('Object');
        done();
    });
    it("Response should have status 401 and be a object with wrong password", (done) =>{
        expect(object).to.be.json;
        expect(object).to.have.status(401);
        expect(object).to.be.a('Object');
        done();
    });
    it("Contains a message with wrong email", (done) => {
        expect(object.body).to.have.property('message').to.be.a('string').eq('Invalid username or password');
        done();
    });
    it("Contains a message with wrong passwrod", (done) => {
        expect(object.body).to.have.property('message').to.be.a('string').eq('Invalid username or password');
        done();
    });
});