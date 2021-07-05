const api_url=require("../urlsfile");
const chai = require("chai");
const expect = require("chai").expect;
const chaihttp = require("chai-http");

chai.should();
chai.use(chaihttp);
auth="Authorization"

token_error="Bearer eyJhbGciOiJIUzI1NCI6IkpXVCJ9.eyJ1aWQiOiI2MDYwNmNhNmM3OGExMTRiZThkMjQ4MDYiLCJlbWFpbCI6Im11aGFtbWFkcmFmYXkxNTFAZ21haWwuY29tIiwibmFtZSI6IlJhZmF5Iiwicm9sZXMiOlsiU3VwZXJBZG1pbiJdLCJpYXQiOjE2MjM1ODc0NjQsImV4cCI6MTYyMzc2MDI2NH0.D04fO-lBUkgfFxz-fn1a4P8hVFYhD4UD5gwRa7OUoik"

describe("Testing Batch Api for data retrival",()=> {
    describe("Testing for unauthorized user data access",()=> {
        it("To check the status of the response",(done)=> {
            chai.request(api_url.serverurls.server)
            .get(api_url.serverurls.Get_links[1])
            .set(auth,token_error)
            .end((error,response)=>{
                response.should.have.status(401);
                response.should.not.have.status(200);
                done();
            })
        });
    });
});