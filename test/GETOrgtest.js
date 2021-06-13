let api_url=require("../urlsfile");
let chai = require("chai");
let expect = require("chai").expect;
let chaihttp = require("chai-http");

chai.should();
chai.use(chaihttp);

auth="Authorization"
let token="Bearer ";
let object={};

raw1= {"email":"muhammadaamir.aj1@gmail.com","password":"123123"}
raw2={"email":"muhammadrafay151@gmail.com", "password":"123123"}

describe("The testing of the data retrived through Organization API", ()=> {
    before(function(done){
        chai.request(api_url.serverurls.server)
        .post(api_url.serverurls.Post_links[0])
        .send(raw2)
        .end((err,resp)=>{
            token=token+resp.body.token;
            resp.should.have.status(200);
            chai.request(api_url.serverurls.server)
            .get(api_url.serverurls.Get_links[3])
            .set(auth,token)
            .end((error,response)=>{
                response.should.have.status(200);
                object=response;
                done();
            })
        })
    })
    describe("Successfull execution of api when Super Admin acces data ",()=> {
        it("To check the status of the response", (done) => {
            object.should.have.status(200);
            object.body.should.be.a('Object');
            done();
        })
        it("To response object should contain the r0equired properties",(done)=>{
            object.body.should.have.property("totalcount");
            object.body.should.have.property("list");
            if (object.body.totalcount > 0){
                for(i=0;i<object.body.list.length;i++){
                    expect(object.body.list[i]).to.have.all.keys("status","ecertcount","user_limit","_id","name","email","phone","country_code","address","register_date","__v");
                    expect(object.body.list[i].status).to.have.property("active");
                }
            }
            done();
        })
        it("To Check the data type and data structures of the properties in response",(done)=>{
            object.body.should.have.property("totalcount").to.be.a('number');
            object.body.should.have.property("list").to.be.a('Array');
            if (object.body.list.length > 0){
                for(i=0;i<object.body.list.length;i++){
                    object.body.list[i].should.be.a('Object');
                    expect(object.body.list[i]).to.have.property("status").to.be.a('Object')
                    expect(object.body.list[i].status).to.have.property("active").to.be.a('boolean');
                    expect(object.body.list[i]).to.have.property("ecertcount").to.be.a('number');
                    expect(object.body.list[i]).to.have.property("user_limit").to.be.a('number');
                    expect(object.body.list[i]).to.have.property("_id").to.be.a('string');
                    expect(object.body.list[i]).to.have.property("name").to.be.a('string');
                    expect(object.body.list[i]).to.have.property("email").to.be.a('string');
                    expect(object.body.list[i]).to.have.property("phone").to.be.a('string');
                    expect(object.body.list[i]).to.have.property("country_code").to.be.a('string');
                    expect(object.body.list[i]).to.have.property("address").to.be.a('string');
                    expect(object.body.list[i]).to.have.property("register_date").to.be.a('string');
                    expect(object.body.list[i]).to.have.property("__v").to.be.a('number');
                }
            }
            done();
        })
        it("To Check the values of properties", (done)=> {
            if (object.body.list.length > 0){
                for(i=0;i<object.body.list.length;i++){
                    expect(object.body.list[i].ecertcount).to.be.greaterThanOrEqual(0);
                    expect(object.body.list[i].user_limit).to.be.greaterThanOrEqual(0);
                    expect(object.body.list[i].status.active).to.be.oneOf([true,false]);
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
