let api_url=require("../urlsfile");
let chai = require("chai");
let expect = require("chai").expect;
let chaihttp = require("chai-http");

chai.should();
chai.use(chaihttp);

auth="Authorization"
let token="Bearer ";
let object={};

raw1= {"email":"muhammadaamir.aj1@gmail.com","password":"zxczxc"}

describe("When admin user access the data", ()=> {
    before(function(done){
        chai.request(api_url.serverurls.server)
        .post(api_url.serverurls.Post_links[0])
        .send(raw1)
        .end((err,resp)=>{
            token=token+resp.body.token;
            resp.should.have.status(200);
            chai.request(api_url.serverurls.server)
            .get(api_url.serverurls.Get_links[3])
            .set(auth,token)
            .end((error,response)=>{
                object=response;
                done();
            })
        })
    })
    it("(Admin)To check the response of the request", (done)=>{
        expect(object).to.have.status(403);
        expect(object).to.not.have.status(200);
        expect(object.body).to.be.empty;
        done();
    });
    it("(Issuer)To check the response of the request", (done)=>{
        expect(object).to.have.status(403);
        expect(object).to.not.have.status(200);
        expect(object.body).to.be.empty;
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