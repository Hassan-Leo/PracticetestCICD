const chai = require("chai");
const expect = require("chai").expect;
const chaihttp = require("chai-http");
const api_url= require("../urlsfile")

chai.should();
chai.use(chaihttp);

let object={}
let token="Bearer "

describe("POST Login API Testing for Admin User",() =>{
    before(function(done){
        chai.request(api_url.serverurls.server)
        .post(api_url.serverurls.Post_links[0])
        .send(api_url.serverurls.raw_data[0])
        .end((err,resp)=>{
            token=token+resp.body.token;
            object=resp;
            resp.should.have.status(200);
            done();
        })
    })
    describe("When the authentication is successful for Admin User", () => {
        it("Response Status of should have 200 and be a object",(done) => {
            expect(object).to.have.status(200);
            expect(object).to.be.a('Object');
            expect(object).to.be.json;
            done();
        }); 
        it("Object contain all the keys requried", (done) => {
            object.body.should.have.keys('organization','status','roles','_id','name','email','phone','country_code','address','register_date','__v','token','RefreshToken');
            expect(object.body).to.have.property('status').to.be.a('Object');
            expect(object.body).to.have.property('roles').to.be.an('Array');
            expect(object.body).to.have.property('organization').to.be.a('Object');
            done();
        });
        it("Object properties should have correct data type", (done) => {
            expect(object.body.status).to.have.property('active').to.be.a('boolean').to.be.oneOf([true,false]);
            for(j=0;j<object.body.roles.length;j++){
                expect(object.body.roles[j]).to.be.oneOf(['SuperAdmin','Admin','Issuer']);
            }
            object.body.should.have.property('_id').to.be.a('string');
            object.body.should.have.property('name').to.be.a('string');
            object.body.should.have.property('email').to.be.a('string');
            object.body.should.have.property('register_date').to.be.a('string');
            object.body.should.have.property('token').to.be.a('string');
            object.body.should.have.property('RefreshToken').to.be.a('string');
            object.body.should.have.property('__v').to.be.a('number');
            expect(object.body).to.have.property('phone').to.be.a('string');
            expect(object.body).to.have.property('country_code').to.be.a('string');
            expect(object.body).to.have.property('address').to.be.a('string');
            done();
        });
        it("To check length of array and objects", (done) => {
                expect(object.body.roles.length).to.have.greaterThanOrEqual(1);
                expect(object.body.email).to.be.eq(api_url.serverurls.raw_data[0].email)
            done();
        });
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
