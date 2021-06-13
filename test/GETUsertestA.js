const chai = require("chai");
const expect = require("chai").expect;
const chaihttp = require("chai-http");
const api_url=require("../urlsfile")

chai.should();
chai.use(chaihttp);

auth="Authorization"
let token="Bearer "
let object={}

describe("Logged User Details Testing for Admin", () => {
    before(function(done){
        chai.request(api_url.serverurls.server)
        .post(api_url.serverurls.Post_links[0])
        .send(api_url.serverurls.raw_data[0])
        .end((err,resp)=>{
            token=token+resp.body.token;
            resp.should.have.status(200);
            chai.request(api_url.serverurls.server)
            .get(api_url.serverurls.Get_links[5])
            .set(auth,token)
            .end((error,response)=>{
                response.should.have.status(200);
                object=response;
                done();
            })
        })
    })
    describe("To view the users details",() => {
        it("To Get Status 200 and retrieve an object", (done) =>{
            expect(object).to.have.status(200);
            expect(object).to.not.have.status(403);
            expect(object).to.be.a('Object');
            expect(object).to.be.json;
            done();
        });
        it("To check the object in the retreived data", (done) =>{
            expect(object.body).to.have.all.keys("list","totalcount");
            for (i=0;i<object.body.list.length;i++)
            {
                expect(object.body.list[i]).to.have.all.keys('status','roles','_id','name','email','register_date','__v','phone','country_code','address');
                expect(object.body.list[i]).to.have.property('status').to.be.a('Object');
                expect(object.body.list[i]).to.have.property('roles').to.be.an('Array');
            }
            expect(object.body).to.have.property('totalcount').to.be.a('number');
            done();
        });
        it("To check datatype of each property in retreived", (done) =>{
            for (i=0;i<object.body.list.length;i++)
            {
                expect(object.body.list[i].status).to.have.property('active').to.be.a('boolean').to.be.oneOf([true,false]);
                expect(object.body.list[i]).to.have.property('roles').to.be.a('Array');
                expect(object.body.list[i].roles[0]).to.be.oneOf(['SuperAdmin','Admin','Issuer']);
                expect(object.body.list[i]).to.have.property('_id').to.be.a('string');
                expect(object.body.list[i]).to.have.property('name').to.be.a('string');
                expect(object.body.list[i]).to.have.property('email').to.be.a('string');
                expect(object.body.list[i]).to.have.property('register_date').to.be.a('string');
                expect(object.body.list[i]).to.have.property('__v').to.be.a('number');
                expect(object.body.list[i]).to.have.property('phone').to.be.a('string');
                expect(object.body.list[i]).to.have.property('country_code').to.be.a('string');
                expect(object.body.list[i]).to.have.property('address').to.be.a('string');
            }
            expect(object.body.totalcount).to.be.greaterThanOrEqual(0);
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