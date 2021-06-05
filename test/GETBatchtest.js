let data=require("../../Ecert.postman_collection.json");
let chai = require("chai");
let expect = require("chai").expect;
let chaihttp = require("chai-http");

chai.should();
chai.use(chaihttp);
auth="Authorization"

raw= {"email":"iyaqoob62@gmail.com","password":"123123"}
raw1={"email":"hassansiddiqi0@gmail.com", "password":"123123"}

token="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MDYwNmRjZDk1NDVhZjM0NTg5ZDY1MDgiLCJlbWFpbCI6Im11aGFtbWFkYWFtaXIuYWoxQGdtYWlsLmNvbSIsIm5hbWUiOiJNdWhhbW1hZCBBYW1pciIsInJvbGVzIjpbIklzc3VlciIsIkFkbWluIl0sIm9yZ19pZCI6IjYwNjA2ZDhmOTU0NWFmMzQ1ODlkNjUwNyIsImlhdCI6MTYyMzE2NzcxOCwiZXhwIjoxNjIzMzQwNTE4fQ.zgjZB8WUV1iw--cHxyJ_oOh2prXzHEM-qfR-oy0gao4"
token1="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MDYwNmNhNmM3OGExMTRiZThkMjQ4MDYiLCJlbWFpbCI6Im11aGFtbWFkcmFmYXkxNTFAZ21haWwuY29tIiwibmFtZSI6IlJhZmF5Iiwicm9sZXMiOlsiU3VwZXJBZG1pbiJdLCJpYXQiOjE2MjMxNjk2MDksImV4cCI6MTYyMzM0MjQwOX0.ROJ-UF14lOAo_xy7VQsCqSVCqyP6fOj3RQZU0xqfPrE"

describe("Testing Batch Api for data retrival",()=> {
    describe("Testing GET request for Authorized personnel",()=> {
        it("To check the status of the response",(done)=> {
            chai.request("http://certifis.herokuapp.com/api/batch")
            .get("")
            .set(auth,token)
            .end((err,resp)=>{
                expect(resp).to.have.status(200);
                expect(resp.body).to.not.be.empty;
                expect(resp.body).to.be.a('Object');
                expect(resp).to.not.have.status(403);
            });
            done();
        });
        it("To check the structure(properties) of the object obtained", (done)=> {
            chai.request("http://certifis.herokuapp.com/api/batch")
            .get("")
            .set(auth,token)
            .end((err,resp)=>{
                expect(resp.body).to.have.property("list");
                expect(resp.body).to.have.property("totalcount");
                if (resp.body.list.length>0){
                    for (i=0;i<resp.body.list.length;i++){
                        expect(resp.body.list[i]).to.have.property("createdby");
                        /* expect(resp.body.list[i]).to.have.property("expiry_date"); */
                        expect(resp.body.list[i]).to.have.property("publish");
                        expect(resp.body.list[i]).to.have.property("created_date");
                        expect(resp.body.list[i]).to.have.property("_id");
                        expect(resp.body.list[i]).to.have.property("batch_name");
                        expect(resp.body.list[i]).to.have.property("title");
                        expect(resp.body.list[i]).to.have.property("description");
                        /* expect(resp.body.list[i]).to.have.property("instructor_name"); */
                        expect(resp.body.list[i]).to.have.property("logo");
                        expect(resp.body.list[i]).to.have.property("signature");
                        expect(resp.body.list[i]).to.have.property("template_id");
                        expect(resp.body.list[i]).to.have.property("updatedby");
                        expect(resp.body.list[i]).to.have.property("__v");
                        expect(resp.body.list[i].createdby).to.have.property("name");
                        expect(resp.body.list[i].createdby).to.have.property("email");
                        expect(resp.body.list[i].createdby).to.have.property("org_name");
                        expect(resp.body.list[i].createdby).to.have.property("org_id");
                        expect(resp.body.list[i].publish).to.have.property("status");
                        expect(resp.body.list[i].publish).to.have.property("processing");
                        for (j=0;j<resp.body.list[i].updatedby.length;j++){
                            expect(resp.body.list[i].updatedby[j]).to.have.property("name");
                            expect(resp.body.list[i].updatedby[j]).to.have.property("email");
                            expect(resp.body.list[i].updatedby[j]).to.have.property("Date");
                        }
                    }
                }
            })
            done();
        });
        it("To check the datatypes of the properties in the responsne object", (done)=> {
            chai.request("http://certifis.herokuapp.com/api/batch")
            .get("")
            .set(auth,token)
            .end((err,resp)=> {
                expect(resp.body.totalcount).to.be.a("number");
                if (resp.body.list.length>0){
                    for (i=0;i<resp.body.list.length;i++){
                        expect(resp.body.list[i].createdby).to.have.keys("name","email","org_name","org_id").to.be.string;
                        expect(resp.body.list[i].publish).to.have.property("status").to.be.a('boolean');
                        expect(resp.body.list[i].publish).to.have.property("processing").to.be.a('boolean');
                        expect(resp.body.list[i].createdby).to.be.a('object');
                        expect(resp.body.list[i].publish).to.be.a('object');
                        if (resp.body.list[i].expiry_date){
                            if(resp.body.list[i].expiry_date == null){
                                expect(resp.body.list[i].expiry_date).to.be.null;
                            }
                            else{
                                expect(resp.body.list[i].expiry_date).to.be.a('string');
                            }
                        }
                        expect(resp.body.list[i].created_date).to.be.a('string');
                        expect(resp.body.list[i]._id).to.be.a('string');
                        expect(resp.body.list[i].title).to.be.a('string');
                        expect(resp.body.list[i].batch_name).to.be.a('string');
                        expect(resp.body.list[i].description).to.be.a('string');
                        expect(resp.body.list[i].logo).to.be.a('string');
                        expect(resp.body.list[i].signature).to.be.a('string');
                        /* expect(resp.body.list[i].instructor_name).to.be.a('string'); */
                        expect(resp.body.list[i].template_id).to.be.a('string');
                        expect(resp.body.list[i].__v).to.be.a('number');
                        for (j=0;j<resp.body.list[i].updatedby.length;j++){
                            expect(resp.body.list[i].updatedby[j]).to.have.keys("name","email","Date").to.be.string;
                        }
                    }
                }
            })
            done();
        })
        it("To Check the values of the properties", (done)=>{
            chai.request("http://certifis.herokuapp.com/api/batch")
            .get("")
            .set(auth,token)
            .end((err,resp)=> {
                expect(resp.body.totalcount).to.be.greaterThanOrEqual(0);
                if (resp.body.list.length>0){
                    for (i=0;i<resp.body.list.length;i++){
                        expect(resp.body.list[i].__v).to.be.equal(0);
                        expect(resp.body.list[i].publish).to.have.property("status").to.be.a('boolean').to.be.false;
                        expect(resp.body.list[i].publish).to.have.property("processing").to.be.a('boolean').to.be.false;
                    }
                }
            });
            done();
        });
    });
    describe("When a user access data be Superadmin or other user",()=> {
        it("To check the status of the response",(done)=> {
            chai.request("http://certifis.herokuapp.com/api/batch")
            .get("")
            .set(auth,token1)
            .end((err,resp)=> {
                resp.should.have.status(200);
                resp.should.not.have.status(403);
                expect(resp.body).to.not.be.empty;
                expect(resp.body).to.be.a("Object");
            });
            done();
        });
    });
});