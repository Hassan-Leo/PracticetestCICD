const chai = require("chai");
const expect = require("chai").expect;
const chaihttp = require("chai-http");
const api_url=require("../urlsfile")

chai.should();
chai.use(chaihttp);

auth="Authorization"
let token="Bearer "
let object={}

describe("To check when Issuer access Admin user data", ()=> {
    before(function(done){
        chai.request(api_url.serverurls.server)
        .post(api_url.serverurls.Post_links[0])
        .send(api_url.serverurls.raw_data[3])
        .end((err,resp)=>{
            token=token+resp.body.token;
            resp.should.have.status(200);
            chai.request(api_url.serverurls.server)
            .get(api_url.serverurls.Get_links[5])
            .set(auth,token)
            .end((error,response)=>{
                object=response;
                done();
            })
        })
    })
    it("To get status 403 and object be null", (done)=> {
        expect(object).to.have.status(403);
        expect(object.body).to.be.empty;
        expect(object).to.not.have.status(200);
        done();
    });
    after(function(done){
        chai.request(api_url.serverurls.server)
        .post(api_url.serverurls.Post_links[1])
        .set(auth,token)
        .end((err,resp)=>{
            resp.should.have.status(200);
            done();
        })
    })
});