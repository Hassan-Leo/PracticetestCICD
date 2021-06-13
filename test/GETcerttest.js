const api_url=require("../urlsfile");
const chai = require("chai");
const expect = require("chai").expect;
const chaihttp = require("chai-http");

chai.should();
chai.use(chaihttp);

raw={"email":"hassansiddiqi0@gmail.com", "password":"zxczxc"}

auth="Authorization"
let token="Bearer ";
let object={};

describe("Testing the Certificate Retrival Data", ()=> {
    before(function(done){
        chai.request(api_url.serverurls.server)
        .post(api_url.serverurls.Post_links[0])
        .send(raw)
        .end((err,resp)=>{
            token=token+resp.body.token;
            resp.should.have.status(200);
            chai.request(api_url.serverurls.server)
            .get(api_url.serverurls.Get_links[0])
            .set(auth,token)
            .end((error,response)=>{
                response.should.have.status(200);
                object=response;
                done();
            })
        })
    })
    describe("To check the Single Certificate API's response which is GET reuqest", () => {
        it("To check the status of the Response",(done)=>{
            object.should.have.status(200);
            object.should.not.have.status(403);
            object.body.should.be.a('Object');
            done();
        })
        it("To check response has all the required property",(done)=>{
            expect(object.body).to.have.all.keys("list","totalcount");
            for(i=0;i<object.body.list.length;i++){
                if(object.body.list[i].expiry_date){
                    object.body.list[i].should.have.keys("issuedby","publish","issue_date","docType","_id","title","description","name","email","instructor_name","template_id","expiry_date","updatedby","__v");
                }
                else{
                    object.body.list[i].should.have.keys("issuedby","publish","issue_date","docType","_id","title","description","name","email","instructor_name","template_id","updatedby","__v");   
                }
            }
            done();
        });
        it("TO check data types of the of the properties in response", (done)=> {
            expect(object.body.list).exist;
            expect(object.body.list).to.be.an('Array');
            if(object.body.list.length> 0){
                for(i=0;i<object.body.list.length;i++){
                    expect(object.body.list[i].issuedby).to.be.a('Object');
                    expect(object.body.list[i].publish).to.be.a('Object');
                    expect(object.body.list[i].issue_date).to.be.a('string');
                    expect(object.body.list[i].docType).to.be.a('string');
                    expect(object.body.list[i]._id).to.be.a('string');
                    expect(object.body.list[i].title).to.be.a('string');
                    expect(object.body.list[i].description).to.be.a('string');
                    expect(object.body.list[i].name).to.be.a('string');
                    expect(object.body.list[i].email).to.be.a('string');
                    expect(object.body.list[i].instructor_name).to.be.a('string');
                    expect(object.body.list[i].template_id).to.be.a('string');
                    if(object.body.list[i].expiry_date){
                        expect(object.body.list[i].expiry_date).to.be.a('string');
                    }
                    expect(object.body.list[i].updatedby).to.be.a('Array');
                    expect(object.body.list[i].__v).to.be.a('number');
                    expect(object.body.list[i].issuedby.issuer_name).to.be.a("string");
                    expect(object.body.list[i].issuedby.issuer_email).to.be.a("string");
                    expect(object.body.list[i].issuedby.org_name).to.be.a("string");
                    expect(object.body.list[i].issuedby.org_id).to.be.a("string");
                    expect(object.body.list[i].publish.status).to.be.a('boolean');
                    expect(object.body.list[i].publish.processing).to.be.a('boolean');
                    if (object.body.list[i].updatedby.length>0){
                        for(j=0;j<object.body.list[i].updatedby.length;j++){
                            expect(object.body.list[i].updatedby[j]).to.be.a('Object');
                            expect(object.body.list[i].updatedby[j].Date).to.be.a('string');
                            expect(object.body.list[i].updatedby[j].name).to.be.a('string');
                            expect(object.body.list[i].updatedby[j].email).to.be.a('string');
                        }
                    }
                }
            }
            expect(object.body.totalcount).to.be.a('number');
            done();
        });
        it("To check length of the arrays and certian equal values in response", (done)=>{
            for(i=0;i<object.body.list.length;i++){
                if (object.body.list[i].updatedby.length > 0){
                    for(j=0;j<resp.body.list[i].updatedby.length;j++){
                        object.body.list[i].updatedby[j].should.have.property("Date").to.be.a('string');
                        object.body.list[i].updatedby[j].should.have.property("name").to.be.a('string');
                        object.body.list[i].updatedby[j].should.have.property("email").to.be.a('string');
                    }
                }
            }
            done();
        });
    });
});