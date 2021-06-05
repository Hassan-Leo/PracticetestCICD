let chai = require("chai");
let expect = require("chai").expect;
let chaihttp = require("chai-http");

chai.should();
chai.use(chaihttp);

auth="Authorization"
token="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MDYwNmNhNmM3OGExMTRiZThkMjQ4MDYiLCJlbWFpbCI6Im11aGFtbWFkcmFmYXkxNTFAZ21haWwuY29tIiwibmFtZSI6IlJhZmF5Iiwicm9sZXMiOlsiU3VwZXJBZG1pbiJdLCJpYXQiOjE2MjMxNjk2MDksImV4cCI6MTYyMzM0MjQwOX0.ROJ-UF14lOAo_xy7VQsCqSVCqyP6fOj3RQZU0xqfPrE"
token1="Bearer eyJhbGciOiJIUzI1NaWQiOiI2MDYwNmNhNmM3OGExMTRiZThkMjQ4MDYiLCJlbWFpbCI6Im11aGFtbWFkcmFmYXkxNTFAZ21haWwuY29tIiwibmFtZSI6IlJhZmF5Iiwicm9sZXMiOlsiU3VwZXJBZG1pbiJdLCJpYXQiOjE2MTg1ODU0OTgsImV4cCI6MTYxODc1ODI5OH0.tDWO5PrvlfyTeMz0pJuYNh46ULIY7osCXRuB3_O_7jU"

server="http://certifis.herokuapp.com/api/users"

describe("Logged User Details Testing for Super Admin", () => {
    describe("To view the users details",() => {
        it("To Get Status 200 and retrieve an object", (done) =>{
            chai.request("http://certifis.herokuapp.com/api/users")
                .get("")
                .set(auth,token)
                .end((err,resp) => {
                    console.log(resp.body);
                    expect(resp).to.have.status(200);
                    expect(resp).to.not.have.status(403);
                    expect(resp).to.be.a('Object');
                    expect(resp).to.be.json;
                });
            done();
        });
        it("To check the object in the retreived", (done) =>{
            chai.request("http://certifis.herokuapp.com/api/users")
                .get("")
                .set(auth, token)
                .end((err,resp) => {
                    for (i=0;i<resp.body.list.length;i++)
                    {
                        expect(resp.body.list[i]).to.have.all.keys('status','roles','_id','name','email','register_date','__v');
                        expect(resp.body.list[i]).to.have.property('status').to.be.a('Object');
                        expect(resp.body.list[i]).to.have.property('roles').to.be.an('Array');
                    }
                    expect(resp.body).to.have.property('totalcount').to.be.a('number');
                })
            done();
        });
        it("To check datatype of each property in retreived", (done) =>{
            chai.request("http://certifis.herokuapp.com/api/users")
                .get("")
                .set(auth,token)
                .end((err,resp) => {
                    for (i=0;i<resp.body.list.length;i++)
                    {
                        expect(resp.body.list[i].status).to.have.property('active').to.be.a('boolean').to.be.true;
                        expect(resp.body.list[i]).to.have.property('roles').to.be.a('Array');
                        expect(resp.body.list[i].roles[0]).to.be.oneOf(['SuperAdmin','Admin','Issuer']);
                        expect(resp.body.list[i]).to.have.property('_id').to.be.a('string');
                        expect(resp.body.list[i]).to.have.property('name').to.be.a('string');
                        expect(resp.body.list[i]).to.have.property('email').to.be.a('string');
                        expect(resp.body.list[i]).to.have.property('register_date').to.be.a('string');
                        expect(resp.body.list[i]).to.have.property('__v').to.be.a('number');
                    }
                    expect(resp.body.totalcount).to.be.greaterThanOrEqual(1);
                });
            done();
        });
    });
    describe("To check when non existing trys to retreive", ()=> {
        it("To get status 401 and object be null", (done)=> {
            chai.request("http://certifis.herokuapp.com/api/users")
                .get("")
                .set(auth,token1)
                .end((err,resp) =>{
                    expect(resp).to.have.status(403);
                    expect(resp.body).to.be.empty;
                    expect(resp).to.not.have.status(200);
                })
            done();
        });
    });
});