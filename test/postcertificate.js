const mocha=require('mocha');
const chai=require('chai');
const expect=require('chai').expect;
const chaiHttp = require('chai-http');
const data_url=require("../urlsfile");

chai.should();
chai.use(chaiHttp);

var obj;
auth="Authorization"
Token="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MDYwNmRjZDk1NDVhZjM0NTg5ZDY1MDgiLCJlbWFpbCI6Im11aGFtbWFkYWFtaXIuYWoxQGdtYWlsLmNvbSIsIm5hbWUiOiJNdWhhbW1hZCBBYW1pciIsInJvbGVzIjpbIklzc3VlciIsIkFkbWluIl0sIm9yZ19pZCI6IjYwNjA2ZDhmOTU0NWFmMzQ1ODlkNjUwNyIsImlhdCI6MTYyMjkzMDM5MCwiZXhwIjoxNjIzMTAzMTkwfQ.1Si_v3k5A1vHswbThT9ycTATmBRTWo1a1N9t8qunAYg"
send_data={
    "title": "hlf",
    "description":"just a test certificate",
    "expiry_date": null,
    "name":"Java",
    "email": "hasasn@gmail.com",
    "instructor_name":"self-paced",
    "logo": "60bbf3d071291b0017b2fff3",
    "signature": "60bbf3d071291b0017b2fff4",
    "certificate_img": "base64"
}

describe("Testing the testing the post resquest for the certificate to be created", ()=> {
    describe("To check the results of the request",()=>{
        it("It should get resposne 200", ()=>{
            chai.request(data_url.item[0].name)
            .post("")
            .set(auth,token)
            .send(send_data)
            .end((err,resp)=>{
                
            })
        })
    })
})