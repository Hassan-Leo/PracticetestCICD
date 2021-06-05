let data=require("../Ecert.postman_collection.json");
let chai = require("chai");
let expect = require("chai").expect;
let chaihttp = require("chai-http");

chai.should();
chai.use(chaihttp);

auth="Authorization"
token="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MDYwNmRjZDk1NDVhZjM0NTg5ZDY1MDgiLCJlbWFpbCI6Im11aGFtbWFkYWFtaXIuYWoxQGdtYWlsLmNvbSIsIm5hbWUiOiJNdWhhbW1hZCBBYW1pciIsInJvbGVzIjpbIklzc3VlciIsIkFkbWluIl0sIm9yZ19pZCI6IjYwNjA2ZDhmOTU0NWFmMzQ1ODlkNjUwNyIsImlhdCI6MTYyMzE2NzcxOCwiZXhwIjoxNjIzMzQwNTE4fQ.zgjZB8WUV1iw--cHxyJ_oOh2prXzHEM-qfR-oy0gao4"
token1="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MDYwNmNhNmM3OGExMTRiZThkMjQ4MDYiLCJlbWFpbCI6Im11aGFtbWFkcmFmYXkxNTFAZ21haWwuY29tIiwibmFtZSI6IlJhZmF5Iiwicm9sZXMiOlsiU3VwZXJBZG1pbiJdLCJpYXQiOjE2MjMxNjk2MDksImV4cCI6MTYyMzM0MjQwOX0.ROJ-UF14lOAo_xy7VQsCqSVCqyP6fOj3RQZU0xqfPrE"

describe("Testing the Certificate Retrival Data", ()=> {
    describe("To check the Single Certificate API's response which is GET reuqest", () => {
        it("To check the status of the Response",(done)=>{
            chai.request("http://certifis.herokuapp.com/api/certificate/")
            .get("")
            .set("Content-Type", "application/json")
            .set(auth,token)
            .end((err,resp) =>{
                resp.should.have.status(200);
                resp.should.not.have.status(403);
                resp.body.should.be.a('Object');
            })
            done();
        })
        it("To check response has all the required property",()=>{
            chai.request("http://certifis.herokuapp.com/api/certificate/")
            .get("")
            .set("Content-Type", "application/json")
            .set(auth, token)
            .end((err, resp)=>{
                expect(resp.body.list).exist;
                expect(resp.body).to.have.keys("list","totalcount");
                for(i=0;i<resp.body.list.length;i++){
                    if(resp.body.list[i].expiry_date){
                        resp.body.list[i].should.have.keys("issuedby","publish","issue_date","docType","_id","title","description","name","email","instructor_name","template_id","expiry_date","updatedby","__v");
                    }
                    else{
                        resp.body.list[i].should.have.keys("issuedby","publish","issue_date","docType","_id","title","description","name","email","instructor_name","template_id","updatedby","__v");
                        
                    }
                }
            })
        });
        it("TO check data types of the of the properties in response", (done)=> {
            chai.request("http://certifis.herokuapp.com/api/certificate/")
            .get("")
            .set("Content-Type", "application/json")
            .set(auth, token)
            .end((err, resp)=>{
                expect(resp.body.list).exist;
                expect(resp.body.list).to.be.an('Array');
                if(resp.body.list.length> 0){
                    for(i=0;i<resp.body.list.length;i++){
                        expect(resp.body.list[i].issuedby).to.be.a('Object');
                        expect(resp.body.list[i].publish).to.be.a('Object');
                        expect(resp.body.list[i].issue_date).to.be.a('string');
                        expect(resp.body.list[i].docType).to.be.a('string');
                        expect(resp.body.list[i]._id).to.be.a('string');
                        expect(resp.body.list[i].title).to.be.a('string');
                        expect(resp.body.list[i].description).to.be.a('string');
                        expect(resp.body.list[i].name).to.be.a('string');
                        expect(resp.body.list[i].email).to.be.a('string');
                        expect(resp.body.list[i].instructor_name).to.be.a('string');
                        expect(resp.body.list[i].template_id).to.be.a('string');
                        if(resp.body.list[i].expiry_date){
                            expect(resp.body.list[i].expiry_date).to.be.a('string');
                        }
                        expect(resp.body.list[i].updatedby).to.be.a('Array');
                        expect(resp.body.list[i].__v).to.be.a('number');
                        expect(resp.body.list[i].issuedby.issuer_name).to.be.a("string");
                        expect(resp.body.list[i].issuedby.issuer_email).to.be.a("string");
                        expect(resp.body.list[i].issuedby.org_name).to.be.a("string");
                        expect(resp.body.list[i].issuedby.org_id).to.be.a("string");
                        expect(resp.body.list[i].publish.status).to.be.a('boolean');
                        expect(resp.body.list[i].publish.processing).to.be.a('boolean');
                        if (resp.body.list[i].updatedby.length>0){
                            for(j=0;j<resp.body.list[i].updatedby.length;j++){
                                expect(resp.body.list[i].updatedby[j]).to.be.a('Object');
                                expect(resp.body.list[i].updatedby[j].Date).to.be.a('string');
                                expect(resp.body.list[i].updatedby[j].name).to.be.a('string');
                                expect(resp.body.list[i].updatedby[j].email).to.be.a('string');
                            }
                        }
                    }
                }
                expect(resp.body.totalcount).to.be.a('number');
            })
            done();
        });
        it("To check length of the arrays and certian equal values in response", (done)=>{
            chai.request("http://certifis.herokuapp.com/api/certificate/")
            .get("")
            .set("Content-Type", "application/json")
            .set(auth, token)
            .end((err, resp)=>{
                for(i=0;i<resp.body.list.length;i++){
                    if (resp.body.list[i].updatedby.length > 0){
                        for(j=0;j<resp.body.list[i].updatedby.length;j++){
                            resp.body.list[i].updatedby[j].should.have.property("Date").to.be.a('string');
                            resp.body.list[i].updatedby[j].should.have.property("name").to.be.a('string');
                            resp.body.list[i].updatedby[j].should.have.property("email").to.be.a('string').eql(raw.email);
                        }
                    }
                    expect(resp.body.list[i]).to.have.property("__v").eql(0);
                }
            });
            done();
        });
    });
    describe("To check details of forbidden access",()=> {
        it("To Check the status 403 got superadmin access data",(done) => {
          chai.request("http://certifis.herokuapp.com/api/certificate/")
            .get("")
            .set("Content-Type", "application/json")
            .set(auth,token1)
            .end((err, resp) => {
              resp.should.have.status(403);
              resp.should.not.have.status(200);
              resp.body.should.be.empty;      
            })
            done();
        })
        it("To Check the status 403 got unauthorized user access data",(done) => {
          chai.request("http://certifis.herokuapp.com/api/certificate/")
            .get("")
            .set("Content-Type", "application/json")
            .set(auth,token1)
            .end((err, resp) => {
              resp.should.have.status(403);
              resp.should.not.have.status(200);
              resp.body.should.be.empty;      
            });
            done();
        });
    });
});