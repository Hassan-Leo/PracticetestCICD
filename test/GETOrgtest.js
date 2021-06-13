let data=require("../urlsfile");
let chai = require("chai");
let expect = require("chai").expect;
let chaihttp = require("chai-http");

chai.should();
chai.use(chaihttp);

auth="Authorization"
let token="Bearer ";
let obj={};

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
