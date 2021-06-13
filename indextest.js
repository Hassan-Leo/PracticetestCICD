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

describe("Testing the testcases",()=> {
    before(function(done){
        chai.request(api_url.serverurls.server)
        .post(api_url.serverurls.Post_links[0])
        .send(raw)
        .end((err,resp)=>{
            token=token+resp.body.token;
            resp.should.have.status(200);
            chai.request(api_url.serverurls.server)
            .get(api_url.serverurls.Get_links[1])
            .set(auth,token)
            .end((error,response)=>{
                response.should.have.status(200);
                object=response;
                done();
            })
        })
    })
    
    after(function(done){
        chai.request(api_url.serverurls.server)
        .post(api_url.serverurls.Post_links[1])
        .set(auth,token)
        .end((err,resp)=>{
            resp.should.have.status(200);
            done();
        })
    })
})

