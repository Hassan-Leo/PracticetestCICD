const api_url=require("../urlsfile");
const chai = require("chai");
const expect = require("chai").expect;
const chaihttp = require("chai-http");

chai.should();
chai.use(chaihttp);
auth="Authorization"

raw1= {"email":"iyaqoob62@gmail.com","password":"123123"}
raw2={"email":"hassansiddiqi0@gmail.com", "password":"zxczxc"}

let token="Bearer ";
let object={};
token_error="Bearer eyJhbGciOiJIUzI1NCI6IkpXVCJ9.eyJ1aWQiOiI2MDYwNmNhNmM3OGExMTRiZThkMjQ4MDYiLCJlbWFpbCI6Im11aGFtbWFkcmFmYXkxNTFAZ21haWwuY29tIiwibmFtZSI6IlJhZmF5Iiwicm9sZXMiOlsiU3VwZXJBZG1pbiJdLCJpYXQiOjE2MjM1ODc0NjQsImV4cCI6MTYyMzc2MDI2NH0.D04fO-lBUkgfFxz-fn1a4P8hVFYhD4UD5gwRa7OUoik"

describe("Testing Batch Api for data retrival",()=> {
    before(function(done){
        chai.request(api_url.serverurls.server)
        .post(api_url.serverurls.Post_links[0])
        .send(raw2)
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
    describe("Testing GET request for Authorized personnel",()=> {
        it("To check the status of the response",(done)=> {
            expect(object).to.have.status(200);
            expect(object.body).to.not.be.empty;
            expect(object.body).to.be.a('Object');
            expect(object).to.not.have.status(403);            
            done();
        });
        it("To check the structure(properties) of the object obtained", (done)=> {
            expect(object.body).to.have.property("list");
            expect(object.body).to.have.property("totalcount");
            if (object.body.list.length>0){
                for (i=0;i<object.body.list.length;i++){
                    if(object.body.list[i].expiry_date === undefined && object.body.list[i].instructor_name === undefined){
                        expect(object.body.list[i]).to.have.all.keys("createdby","publish","created_date","_id","batch_name","title","description","logo","signature","template_id","updatedby","__v");
                    }
                    else if(object.body.list[i].expiry_date === undefined && object.body.list[i].instructor_name !== undefined){
                        expect(object.body.list[i]).to.have.all.keys("createdby","publish","created_date","_id","batch_name","title","description","logo","expiry_date","signature","template_id","updatedby","__v");
                    }
                    else if(object.body.list[i].expiry_date !== undefined && object.body.list[i].instructor_name === undefined){
                        expect(object.body.list[i]).to.have.all.keys("createdby","publish","created_date","_id","batch_name","title","description","instructor_name","logo","signature","template_id","updatedby","__v");
                    }
                    else{
                        expect(object.body.list[i]).to.have.all.keys("createdby","publish","created_date","_id","batch_name","title","description","instructor_name","logo","signature","template_id","updatedby","__v","expiry_date");
                    }
                    expect(object.body.list[i].createdby).to.have.all.keys("name","email","org_name","org_id");
                    expect(object.body.list[i].publish).to.have.all.keys("status","processing");
                    for (j=0;j<object.body.list[i].updatedby.length;j++){
                        expect(object.body.list[i].updatedby[j]).to.have.all.keys("name","email","Date");
                    }
                }
            }
            done();
        });
        it("To check the datatypes of the properties in the objectonsne object", (done)=> {
            expect(object.body.totalcount).to.be.a("number");
            expect(object.body.list).to.be.an("array");
            if (object.body.list.length>0){
                for (i=0;i<object.body.list.length;i++){
                    expect(object.body.list[i].createdby).to.have.all.keys("name","email","org_name","org_id").to.be.string;
                    expect(object.body.list[i].publish).to.have.property("status").to.be.a('boolean');
                    expect(object.body.list[i].publish).to.have.property("processing").to.be.a('boolean');
                    expect(object.body.list[i].createdby).to.be.a('object');
                    expect(object.body.list[i].publish).to.be.a('object');
                    if (object.body.list[i].expiry_date){
                        expect(object.body.list[i].expiry_date).to.be.a('string');
                    }
                    if (object.body.list[i].instructor_name){
                        expect(object.body.list[i].instructor_name).to.be.a('string');
                    }
                    expect(object.body.list[i].created_date).to.be.a('string');
                    expect(object.body.list[i]._id).to.be.a('string');
                    expect(object.body.list[i].title).to.be.a('string');
                    expect(object.body.list[i].batch_name).to.be.a('string');
                    expect(object.body.list[i].description).to.be.a('string');
                    expect(object.body.list[i].logo).to.be.a('string');
                    expect(object.body.list[i].signature).to.be.a("string");
                    expect(object.body.list[i].template_id).to.be.a("string");
                    expect(object.body.list[i].__v).to.be.a('number');
                    for (j=0;j<object.body.list[i].updatedby.length;j++){
                        expect(object.body.list[i].updatedby[j]).to.have.all.keys("name","email","Date").to.be.string;
                    }
                }
            }
            done();
        });
        it("To Check the values of the properties", (done)=>{
            expect(object.body.totalcount).to.be.greaterThanOrEqual(0);
            if (object.body.list.length>0){
                for (i=0;i<object.body.list.length;i++){
                    expect(object.body.list[i].publish).to.have.property("status").to.be.a('boolean').to.be.false;
                    expect(object.body.list[i].publish).to.have.property("processing").to.be.a('boolean').to.be.false;
                }
            }
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