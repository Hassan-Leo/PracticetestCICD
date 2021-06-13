const api_url= require("./urlsfile.js");
const chai=require('chai');
const expect=require('chai').expect;
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

let token="Bearer ";
let object={};
auth="Authorization"
raw={
    "email":"hassansiddiqi0@gmail.com",
    "password":"zxczxc"
}

describe("testing sample",()=> {
    before(function(done){
        chai.request(api_url.serverurl_get.server)
        .post(api_url.serverurl_get.Post_links[0])
        .send(raw)
        .end((end,resp)=>{
            token=token+resp.body.token;
            object=resp;
            resp.should.have.status(200);
            done();
        })
    })
    it("To get all certificates data and check response",(done)=>{
        chai.request(api_url.serverurl_get.server)
        .get(api_url.serverurl_get.Get_links[0])
        .set(auth,token)
        .end((err,resp)=>{
            console.log(object.status);
            resp.should.have.status(200);
            done();
        })
    })
    after(function(done){
        chai.request(api_url.serverurl_get.server)
        .post(api_url.serverurl_get.Post_links[1])
        .set(auth,token)
        .end((err,resp)=>{
            done();
        })
    })
})
