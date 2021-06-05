let data=require("../Ecert.postman_collection.json");
let chai = require("chai");
let expect = require("chai").expect;
let chaihttp = require("chai-http");

chai.should();
chai.use(chaihttp);

auth="Authorization"

token1="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MDYwNmNhNmM3OGExMTRiZThkMjQ4MDYiLCJlbWFpbCI6Im11aGFtbWFkcmFmYXkxNTFAZ21haWwuY29tIiwibmFtZSI6IlJhZmF5Iiwicm9sZXMiOlsiU3VwZXJBZG1pbiJdLCJpYXQiOjE2MjMxNjk2MDksImV4cCI6MTYyMzM0MjQwOX0.ROJ-UF14lOAo_xy7VQsCqSVCqyP6fOj3RQZU0xqfPrE"
token2="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MDYwNmRjZDk1NDVhZjM0NTg5ZDY1MDgiLCJlbWFpbCI6Im11aGFtbWFkYWFtaXIuYWoxQGdtYWlsLmNvbSIsIm5hbWUiOiJNdWhhbW1hZCBBYW1pciIsInJvbGVzIjpbIklzc3VlciIsIkFkbWluIl0sIm9yZ19pZCI6IjYwNjA2ZDhmOTU0NWFmMzQ1ODlkNjUwNyIsImlhdCI6MTYyMzE2NzcxOCwiZXhwIjoxNjIzMzQwNTE4fQ.zgjZB8WUV1iw--cHxyJ_oOh2prXzHEM-qfR-oy0gao4"

raw1= {"email":"muhammadaamir.aj1@gmail.com","password":"123123"}
raw2={"email":"muhammadrafay151@gmail.com", "password":"123123"}

describe("The testing of the data retrived through Organization API", ()=> {
    describe("Successfull execution of api when Super Admin acces data ",()=> {
        it("To check the status of the response", (done) => {
            chai.request("http://certifis.herokuapp.com/api/organization")
            .get("")
            .set(auth,token1)
            .end((err,resp) =>{
                resp.should.have.status(200);
                resp.body.should.be.a('Object');
            })
            done();
        })
        it("To response object should contain the required properties",(done)=>{
            chai.request("http://certifis.herokuapp.com/api/organization")
            .get("")
            .set(auth,token1)
            .end((err,resp) =>{
                resp.body.should.have.property("totalcount");
                resp.body.should.have.property("list");
                if (resp.body.totalcount > 0){
                    for(i=0;i<resp.body.list.length;i++){
                        expect(resp.body.list[i]).to.have.all.keys("status","ecertcount","user_limit","_id","name","email","phone","country_code","address","register_date","__v");
                        expect(resp.body.list[i].status).to.have.property("active");
                    }
                }
            })
            done();
        })
        it("To Check the data type and data structures of the properties in response",(done)=>{
            chai.request("http://certifis.herokuapp.com/api/organization")
            .get("")
            .set(auth,token1)
            .end((err,resp) =>{
                resp.body.should.have.property("totalcount").to.be.a('number');
                resp.body.should.have.property("list").to.be.a('Array');
                if (resp.body.list.length > 0){
                    for(i=0;i<resp.body.list.length;i++){
                        resp.body.list[i].should.be.a('Object');
                        expect(resp.body.list[i]).to.have.property("status").to.be.a('Object')
                        expect(resp.body.list[i].status).to.have.property("active").to.be.a('boolean');
                        expect(resp.body.list[i]).to.have.property("ecertcount").to.be.a('number');
                        expect(resp.body.list[i]).to.have.property("user_limit").to.be.a('number');
                        expect(resp.body.list[i]).to.have.property("_id").to.be.a('string');
                        expect(resp.body.list[i]).to.have.property("name").to.be.a('string');
                        expect(resp.body.list[i]).to.have.property("email").to.be.a('string');
                        expect(resp.body.list[i]).to.have.property("phone").to.be.a('string');
                        expect(resp.body.list[i]).to.have.property("country_code").to.be.a('string');
                        expect(resp.body.list[i]).to.have.property("address").to.be.a('string');
                        expect(resp.body.list[i]).to.have.property("register_date").to.be.a('string');
                        expect(resp.body.list[i]).to.have.property("__v").to.be.a('number');
                    }
                }
            })
            done();
        })
        it("To Check the values of properties", (done)=> {
            chai.request("http://certifis.herokuapp.com/api/organization")
            .get("")
            .set(auth,token1)
            .end((err,resp) =>{
                if (resp.body.list.length > 0){
                    for(i=0;i<resp.body.list.length;i++){
                        expect(resp.body.list[i].ecertcount).to.be.greaterThanOrEqual(0);
                        expect(resp.body.list[i].user_limit).to.be.greaterThanOrEqual(0);
                        expect(resp.body.list[i].__v).to.be.eq(0);
                        expect(resp.body.list[i].status.active).to.be.oneOf([true,false]);
                    }
                }
            })
            done();
        });
    });
    describe("When admin user access the data", ()=> {
        it("(Admin)To check the response of the request", (done)=>{
            chai.request(data.item[16].name)
            .get("")
            .set(auth, token2)
            .end((err,resp)=> {
                expect(resp).to.have.status(403);
                expect(resp).to.not.have.status(200);
                expect(resp.body).to.be.empty;
                if(err != null){
                    console.log(err)
                }
            });
            done();
        });
        it("(Issuer)To check the response of the request", (done)=>{
            chai.request(data.item[16].name)
            .get("")
            .set(auth, token2)
            .end((err,resp)=> {
                expect(resp).to.have.status(403);
                expect(resp).to.not.have.status(200);
                expect(resp.body).to.be.empty;
                if(err != null){
                    console.log(err)
                }
            })
            done();
        });
    });
});
