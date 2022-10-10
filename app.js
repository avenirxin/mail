const express=require('express');
const ejs=require('ejs');
var nodemailer = require('nodemailer');
var dotenv = require('dotenv');
var cors = require('cors')
const { request } = require('express');

let port= process.env.PORT || 3000;

dotenv.config()

const app=express();

app.use(express.json());
app.use(cors())

//create option
var options = {
    service: "gmail",
    port:587,
    secure:false,
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.PASSWORD
    }
  };

  var transporter = nodemailer.createTransport(options)

//default server start
app.listen(port,function(res,req)
{
console.log("Server running on port: "+3000);

}); 

app.get('/',function(req,res){
  res.send("Avenirx Connection successfull...")
});

app.post('/mail',async(req,res)=>{

    //read data from request
    //console.log(req.body.users);

    //var fName=request.body.fName
    //var lName=request.body.lName
    //var message=request.body.message
    //var usermail=request.body.usermail

   let users=[];
users=req.body.users;
try {
    //ejs compile
    let data=await ejs.renderFile(__dirname + "/index.ejs",{users})

    console.log(data)

    var mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: 'New Client Enquiry',
        html: data
        //text: 'That was easy!'

      };

      //sending mail
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      return res.send("mail sent successfully !!!")
    

} catch (error) {
    
}


    //nodemailer config
  });