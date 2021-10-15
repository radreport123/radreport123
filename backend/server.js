
const express = require('express')
var AWS = require("aws-sdk")
var nodemailer = require('nodemailer');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const app = express()
app.use(express.json())
var tempdatalocation = ''
app.use(fileUpload());
const s3 = new AWS.S3({
  accessKeyId: "AKIA3RF6VQ5VAY3S42EP",
  secretAccessKey: "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",
  region: "ap-southeast-2",
});

AWS.config.update({
  region: "ap-southeast-2",
  endpoint: "http://dynamodb.ap-southeast-2.amazonaws.com",
  "accessKeyId":"AKIA3RF6VQ5VAY3S42EP","secretAccessKey":"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"
});
var docClient = new AWS.DynamoDB.DocumentClient();
// var dynamodb = new AWS.DynamoDB();

// var params = {
//   TableName : "RadsAdminDB",
//   KeySchema: [       
//       { AttributeName: "Id", KeyType: "HASH"},  //Partition key
//       { AttributeName: "Email", KeyType: "RANGE" }  //Sort key
//   ],
//   AttributeDefinitions: [       
//       { AttributeName: "Id", AttributeType: "N" },
//       { AttributeName: "Email", AttributeType: "S" }
//   ],
//   ProvisionedThroughput: {       
//       ReadCapacityUnits: 5, 
//       WriteCapacityUnits: 5
//   }
// };

// dynamodb.createTable(params, function(err, data) {
//   if (err) {
//       console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
//   } else {
//       console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
//   }
// });


// app.get('/images/:key', (req, res) => {

//   const key = req.params.key
//   console.log(key)
//    const readStream = getFileStream(key)

//    readStream.pipe(res)
  

// }
// )
/////////////////////////Upload Reports/////////////////////////
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file
const fileName = file.name



  const mimetype = file.mimetype;
    const params = {
        Bucket: "radsdemoproject", // pass your bucket name
        Key: fileName,
        Body: file.data,
        ContentType: mimetype,
         ACL: 'public-read'
    };

    s3.upload(params, function(s3Err, data) {
        if (s3Err) throw s3Err
        console.log('File uploaded successfully at -> ', data.Location);
        tempdatalocation = data.Location
        return res.send(JSON.stringify(tempdatalocation))
    });
//  });
});

console.log(tempdatalocation)
/////////////////////////GET ADMIN LOGIN VERIFICATION///////////////
app.get('/GETADMINLOGINDATA/:PASSWORDVALUE/:NAMEVALUE', async(req, res)=>{
  const mrndattaa = req.params.PASSWORDVALUE
  const sdff = JSON.stringify(mrndattaa)
  const dfgg= sdff.substring(3)
  const AAAAA = dfgg.replace(/\\/g,'')
  const PASWORDDD = AAAAA.replace(/\"/g,'')
  const emialdattaa = req.params.NAMEVALUE
  const qwee = JSON.stringify(emialdattaa)
  const dfgggg= qwee.substring(3)
  const AAAAAAA = dfgggg.replace(/\\/g,'')
  const EMAILLLL = AAAAAAA.replace(/\"/g,'')

// console.log(EMAILLLL)
// console.log(PASWORDDD)
const params = {
  "TableName": "RadsAdminDB",
  
  "FilterExpression": "begins_with(#DYNOBASE_Email, :Email) AND contains(#DYNOBASE_Password, :Password)",
  "ExpressionAttributeNames": {
    "#DYNOBASE_Email": "Email",
    "#DYNOBASE_Password": "Password",
  },
  "ExpressionAttributeValues": {
    ":Email": EMAILLLL,
    ":Password": PASWORDDD
  }
};

await docClient.scan(params,function(err, data) {
  if (err) {
      console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
      
  } else {
      //console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
      //console.log(JSON.stringify(data))
      res.send(JSON.stringify(data))
  
  
    }

 
  });

  })
  ////////////////////////////Accepted Study//////////////////
  app.post('/UPDATESTUDYSTATUSACCEPTDATA', function(req, res){

    // const descriptionn = req.data.descriptionnn
    // //   res.send({imagePath: `/images/${result.Key}`})
    const passwordvalueE = req.body.PasswordDATA
    const pass222= passwordvalueE.substring(1)
    const pass333 = pass222.replace(/\\/g,'')
    const PASSWORDVALUE444 = pass333.replace(/\"/g,'')
  
  
    const emaillL = req.body.EMAILDATA
    const mrnvalueE = req.body.MRNDATA
    const mrn222 = JSON.stringify(mrnvalueE)
    const mrn333= mrn222.substring(3)
    const mrn444 = mrn333.replace(/\\/g,'')
    const MRNVALUE555 = mrn444.replace(/\"/g,'')
    const email222= emaillL.substring(1)
    const email333 = email222.replace(/\\/g,'')
    const EMAILLL444 = email333.replace(/\"/g,'')
    // console.log(EMAILLL44)
    // console.log(MRNVALUE55)
    // console.log(PASSWORDVALUE44)
  
    docClient
    .update({
      TableName: "RadsDB",
      Key: {
        MRN : MRNVALUE555,
        Email: EMAILLL444,
      },
      UpdateExpression: `set Study_Status = :Study_Status`,
      ExpressionAttributeValues: {
        ":Study_Status": PASSWORDVALUE444,
      },
    })
    .promise()
    .then(data => console.log(data))
    .catch(console.error)
  
  
  
  
  })

/////////////////////////POST USER DATA///////////////
app.post('/POSTDATA', function(req, res){

  // const descriptionn = req.data.descriptionnn
  // //   res.send({imagePath: `/images/${result.Key}`})
  const descript = req.body.descriptionnn
  const reporttt = req.body.report
  const emaill = req.body.email
  const statuss = req.body.status
  const modalityy = req.body.modality
  const passwordd = req.body.password
  const DOBB = req.body.DOB
  const startdatee = req.body.startdate
  const genderr = req.body.gender
  const firstname = req.body.first_name
  const lasttname = req.body.last_name
  const randomnum=req.body.rndnumber
  const startdatee2 = startdatee.toString()
  const startdatee3 = startdatee2.slice(0,10)
  const DOBBB = DOBB.toString()
  const DOB3 = DOBBB.slice(0, 10)
const timages = req.body.TotalImages
//var imgpaths = req.body.ARRR
const imgpaths=req.body.Imagespaths;
console.log(imgpaths)

    var params = {
      TableName: "RadsDB",
      Item: {
          "MRN": randomnum,
          "Email": emaill,
          "Study_Status":statuss,
          "Description":  descript,
          "Modality": modalityy,
          "Password":passwordd,
          "Date_of_birth":DOB3,
          "Start_Date":startdatee3,
          "Gender":genderr,
          "First_Name":firstname,
          "Last_Name":lasttname,
          "Report":reporttt,
          "Total_Images":timages,
          "Images_Paths":imgpaths
      }
    };
    
    docClient.put(params, function(err, data) {
     if (err) {
         console.error("Unable to add study", ". Error JSON:", JSON.stringify(err, null, 2));
     } else {
         console.log("PutItem succeeded:", "Study Added");
       
     }
    });
})
////////////////////////////GET USER DATA////////////
app.get('/GETDATA/:MRNVALUE/:EMAILVALUE', function(req, res) {
  const mrndatta = req.params.MRNVALUE
  const sdf = JSON.stringify(mrndatta)
  const dfg= sdf.substring(3)
  const AAAA = dfg.replace(/\\/g,'')
  const MRNNN = AAAA.replace(/\"/g,'')
  const emialdatta = req.params.EMAILVALUE
  const qwe = JSON.stringify(emialdatta)
  const dfggg= qwe.substring(3)
  const AAAAAA = dfggg.replace(/\\/g,'')
  const EMAILLL = AAAAAA.replace(/\"/g,'')
  //  console.log(EMAILLL)
  //  console.log(MRNNN)
   
    var params = {
        TableName: "RadsDB",
        Key:{
          "MRN":  MRNNN,
          "Email": EMAILLL,
        }
    };
  docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        res.send(data)
    
    
      }
  
   
    }
    );
  })
  /////////////////////////////////GET USER DATA FOR DROPBOX/////////
  app.get('/GETDATADROPBOX/:MRNNUMBER/:email', function(req, res) {
    const mrndattada = req.params.MRNNUMBER
   // const sdfa = JSON.stringify(mrndattada)
    // const dfga= sdfa.substring(3)
    // const AAAAa = dfga.replace(/\\/g,'')
    // const MRNNNa = AAAAa.replace(/\"/g,'')
    const emialdattaa = req.params.email
    // const qwea = JSON.stringify(emialdattaa)
    // const dfggga= qwea.substring(3)
    // const AAAAAAa = dfggga.replace(/\\/g,'')
    // const EMAILLLa = AAAAAAa.replace(/\"/g,'')
      // console.log(emialdattaa)
      // console.log(mrndattada)
     
      var params = {
          TableName: "RadsDB",
          Key:{
            "MRN":  mrndattada,
            "Email": emialdattaa,
          }
      };
    docClient.get(params, function(err, data) {
      if (err) {
          console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
          
      } else {
          console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
          res.send(data)
      
      
        }
    
     
      }
      );
    })
  /////////////////////////////////fetch incomplete stydy///////
  

  app.get('/GETINCOMPLETESTUDYDATA/:EMAILVALUE', async(req, res)=>{

    const emialdatta = req.params.EMAILVALUE
    const qweEE = JSON.stringify(emialdatta)
    const dfgggGG= qweEE.substring(1)
    const AAAAAA33 = dfgggGG.replace(/\\/g,'')
    const EMAILLL12 = AAAAAA33.replace(/\"/g,'')

// console.log(EMAILLL12)

  const params = {
    "TableName": "RadsDB",
    
    // "FilterExpression": "begins_with(#DYNOBASE_Study_Status, :Study_Status) ",
    // "ExpressionAttributeNames": {
    //   "#DYNOBASE_Study_Status": "Study_Status",

    // },
    // "ExpressionAttributeValues": {
    //   ":Study_Status": EMAILLL12,

    // }
    FilterExpression: "#Study_Status = :Study_Status",
    ExpressionAttributeNames: {
        "#Study_Status": "Study_Status",
    },
    ExpressionAttributeValues: { ":Study_Status": 'Incomplete' }

  };
  
 const resultss= await docClient.scan(params).promise();
 res.send(resultss)
    })
///////////////////////////////GET COMPLETE STUDY DATA//////////////

app.get('/GETCOMPLETESTUDYDATA/:EMAILVALUE', async(req, res)=>{

  const emialdatta = req.params.EMAILVALUE
  const qweEE = JSON.stringify(emialdatta)
  const dfgggGG= qweEE.substring(1)
  const AAAAAA33 = dfgggGG.replace(/\\/g,'')
  const EMAILLL12 = AAAAAA33.replace(/\"/g,'')

// console.log(EMAILLL12)

const params = {
  "TableName": "RadsDB",
  
  // "FilterExpression": "begins_with(#DYNOBASE_Study_Status, :Study_Status) ",
  // "ExpressionAttributeNames": {
  //   "#DYNOBASE_Study_Status": "Study_Status",

  // },
  // "ExpressionAttributeValues": {
  //   ":Study_Status": EMAILLL12,

  // }
  FilterExpression: "#Study_Status = :Study_Status",
  ExpressionAttributeNames: {
      "#Study_Status": "Study_Status",
  },
  ExpressionAttributeValues: { ":Study_Status": 'Complete' }

};

const resultss= await docClient.scan(params).promise();
res.send(resultss)
  })

//////////////////////////////Login search/////////////////////////
  app.get('/GETLOGINDATA/:PASSWORDVALUE/:EMAILVALUE', async(req, res)=>{
    const mrndatta = req.params.PASSWORDVALUE
    const sdf = JSON.stringify(mrndatta)
    const dfg= sdf.substring(3)
    const AAAA = dfg.replace(/\\/g,'')
    const PASWORDD = AAAA.replace(/\"/g,'')
    const emialdatta = req.params.EMAILVALUE
    const qwe = JSON.stringify(emialdatta)
    const dfggg= qwe.substring(3)
    const AAAAAA = dfggg.replace(/\\/g,'')
    const EMAILLL = AAAAAA.replace(/\"/g,'')


  const params = {
    "TableName": "RadsDB",
    
    "FilterExpression": "begins_with(#DYNOBASE_Email, :Email) AND contains(#DYNOBASE_Password, :Password)",
    "ExpressionAttributeNames": {
      "#DYNOBASE_Email": "Email",
      "#DYNOBASE_Password": "Password",
    },
    "ExpressionAttributeValues": {
      ":Email": EMAILLL,
      ":Password": PASWORDD
    }
  };
  
  await docClient.scan(params,function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        
    } else {
        //console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        //console.log(JSON.stringify(data))
        res.send(JSON.stringify(data))
    
    
      }
  
   
    });
 
    })
    ///////////////////////////////////////////////////Incomplete Study Search//////////////
    app.get('/GETSTUDYDATA/:PASSWORDVALUE/:EMAILVALUE', async(req, res)=>{
      const mrndattaaaa = req.params.PASSWORDVALUE
      const sdffff = JSON.stringify(mrndattaaaa)
      const dfgggg= sdffff.substring(1)
      const AAAAAAA = dfgggg.replace(/\\/g,'')
      const PASWORDDDD = AAAAAAA.replace(/\"/g,'')
      const emialdattaaaa = req.params.EMAILVALUE
      const qweeee = JSON.stringify(emialdattaaaa)
      const dfgggggg= qweeee.substring(3)
      const AAAAAAAAA = dfgggggg.replace(/\\/g,'')
      const EMAILLLLLL = AAAAAAAAA.replace(/\"/g,'')
  // console.log(EMAILLLLLL)
  // console.log(PASWORDDDD)
  
    const params = {
      "TableName": "RadsDB",
      
      "FilterExpression": "begins_with(#DYNOBASE_Email, :Email) AND contains(#DYNOBASE_Study_Status, :Study_Status)",
      "ExpressionAttributeNames": {
        "#DYNOBASE_Email": "Email",
        "#DYNOBASE_Study_Status": "Study_Status",
      },
      "ExpressionAttributeValues": {
        ":Email": EMAILLLLLL,
        ":Study_Status": PASWORDDDD
      }
    };
    
    const result= await docClient.scan(params).promise()
        res.send(result)
     
    
   
      })
      /////////////////////////////////////////////////Incomplete approval///////////
      app.post('/UPDATESTUDYSTATUSDATA', function(req, res){

        // const descriptionn = req.data.descriptionnn
        // //   res.send({imagePath: `/images/${result.Key}`})
        const passwordvalueE = req.body.STATUSDATA
        const pass22E= passwordvalueE.substring(0)
        const pass33E = pass22E.replace(/\\/g,'')
        const PASSWORDVALUE44E = pass33E.replace(/\"/g,'')
      
      
        const emaillE = req.body.EMAILDATAA
        const mrnvalueE = req.body.MRNDATAA
        const mrn22E = JSON.stringify(mrnvalueE)
        const mrn33E= mrn22E.substring(0)
        const mrn44E = mrn33E.replace(/\\/g,'')
        const MRNVALUE55E = mrn44E.replace(/\"/g,'')
        const email22E= emaillE.substring(0)
        const email33E = email22E.replace(/\\/g,'')
        const EMAILLL44E = email33E.replace(/\"/g,'')
        // console.log(EMAILLL44E)
        // console.log(MRNVALUE55E)
        // console.log(PASSWORDVALUE44E)
      
        docClient
        .update({
          TableName: "RadsDB",
          Key: {
            MRN : MRNVALUE55E,
            Email: EMAILLL44E,
          },
          UpdateExpression: `set Study_Status = :Study_Status`,
          ExpressionAttributeValues: {
            ":Study_Status": PASSWORDVALUE44E,
          },
        })
        .promise()
        .then(data => console.log(data))
        .catch(console.error)
      
      
      
      
      })
      ///////////////////////////////////////////////////Update images path from dropbox//////
      app.post('/UPDATEIMAGESPATHDATA', function(req, res){

        // const descriptionn = req.data.descriptionnn
        // //   res.send({imagePath: `/images/${result.Key}`})
        const passwordvalueE = req.body.ImageDATA
        const imgvalueE = req.body.Imagenumber
        // const pass22E= passwordvalueE.substring(0)
        // const pass33E = pass22E.replace(/\\/g,'')
        // const PASSWORDVALUE44E = pass33E.replace(/\"/g,'')
      
      
        const emaillE = req.body.EMAILDATA
       
        const mrnvalueE = req.body.MRNDATA
       
        // const mrn33E= mrn22E.substring(0)
        // const mrn44E = mrn33E.replace(/\\/g,'')
        // const MRNVALUE55E = mrn44E.replace(/\"/g,'')
        // const email22E= emaillE.substring(0)
        // const email33E = email22E.replace(/\\/g,'')
        // const EMAILLL44E = email33E.replace(/\"/g,'')
       //  console.log(email2E)
        // console.log(mrn22E)
         //console.log(passwordvalueE)
      // console.log(pass)
        docClient
        .update({
          TableName: "RadsDB",
          Key: {
            MRN : mrnvalueE,
            Email: emaillE,
          },
          UpdateExpression: `set Images_Paths = :Images_Paths , Total_Images = :Total_Images`,
          ExpressionAttributeValues: {
            ":Images_Paths": passwordvalueE,
            ":Total_Images": imgvalueE,
          },
        })
        .promise()
        .then(data => console.log(data))
        .catch(console.error)
      
      
      
      
      })
    ///////////////////////////////////////////////////email search/////////////////////////
  

    app.get('/GEEMAILDATA/:EMAILVALUE', async(req, res)=>{

      const emialdatta = req.params.EMAILVALUE
      const qwe = JSON.stringify(emialdatta)
      const dfggg= qwe.substring(3)
      const AAAAAA = dfggg.replace(/\\/g,'')
      const EMAILLL = AAAAAA.replace(/\"/g,'')


  
    const params = {
      "TableName": "RadsDB",
      
      "FilterExpression": "begins_with(#DYNOBASE_Email, :Email) ",
      "ExpressionAttributeNames": {
        "#DYNOBASE_Email": "Email",
  
      },
      "ExpressionAttributeValues": {
        ":Email": EMAILLL,
 
      }
    };
    
    await docClient.scan(params,function(err, data) {
      if (err) {
          console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
          
      } else {
          //console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
          //console.log(JSON.stringify(data))
          res.send(JSON.stringify(data))
      
      
        }
    
     
      });
   
      })
      /////////////////////////////////////////////email code send/////////////////////////
      app.post('/SENDCODEDATA', function(req, res){

        // const descriptionn = req.data.descriptionnn
        // //   res.send({imagePath: `/images/${result.Key}`})
        const code = req.body.CODE
        const emaill = req.body.EMAILDATA

        // console.log(emaill)

      
       var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'radsreport123@gmail.com',
          pass: 'Radsreport@1'
        }
      });
      
      var mailOptions = {
        from: 'radsreport123@gmail.com',
        to: emaill,
        subject: 'Varification Code',
        text:code
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.send(info.response)
        }
      });



      })
      
//////////////////////////////////update password//////////////
app.post('/UPDATEPASSWORDDATA', function(req, res){

  // const descriptionn = req.data.descriptionnn
  // //   res.send({imagePath: `/images/${result.Key}`})
  const passwordvalue = req.body.PasswordDATA
  const pass22= passwordvalue.substring(1)
  const pass33 = pass22.replace(/\\/g,'')
  const PASSWORDVALUE44 = pass33.replace(/\"/g,'')


  const emaill = req.body.EMAILDATA
  const mrnvalue = req.body.MRNDATA
  const mrn22 = JSON.stringify(mrnvalue)
  const mrn33= mrn22.substring(3)
  const mrn44 = mrn33.replace(/\\/g,'')
  const MRNVALUE55 = mrn44.replace(/\"/g,'')
  const email22= emaill.substring(1)
  const email33 = email22.replace(/\\/g,'')
  const EMAILLL44 = email33.replace(/\"/g,'')
  // console.log(EMAILLL44)
  // console.log(MRNVALUE55)
  // console.log(PASSWORDVALUE44)

  docClient
  .update({
    TableName: "RadsDB",
    Key: {
      MRN : MRNVALUE55,
      Email: EMAILLL44,
    },
    UpdateExpression: `set Password = :Password`,
    ExpressionAttributeValues: {
      ":Password": PASSWORDVALUE44,
    },
  })
  .promise()
  .then(data => console.log(data))
  .catch(console.error)




})
app.post('/UPDATEPROFILE', function(req, res){


  const emaill111 = req.body.email
  const mrnvalueee = req.body.MRNDATA
  const mrn222 = JSON.stringify(mrnvalueee)
  const mrn333= mrn222.substring(3)
  const mrn444 = mrn333.replace(/\\/g,'')
  const MRNVALUE555 = mrn444.replace(/\"/g,'')
  const email222= emaill111.substring(0)
  const email333 = email222.replace(/\\/g,'')
  const EMAILLL444 = email333.replace(/\"/g,'')
  const descriptt = req.body.descriptionnn
const reportttt = req.body.reportt
  const modalityyy = req.body.modality
 const imagespathsss=req.body.Totalimagespaths
  const DOBBB = req.body.DOB
  const startdateee = req.body.startdate
  const genderrr = req.body.gender
  const firstnamee = req.body.first_name
  const lasttnamee = req.body.last_name
  const studystatusss = req.body.studystatuss
  const timagesdata = req.body.TotalImages
  const startdatee22 = startdateee.toString()
  const startdatee33 = startdatee22.slice(0,10)
  const DOBBBB = DOBBB.toString()
  const DOB33 = DOBBBB.slice(0, 10)
  // console.log(EMAILLL444)
  // console.log(MRNVALUE555)
  // console.log(PASSWORDVALUE44)

  docClient
  .update({
    TableName: "RadsDB",
    Key: {
      MRN : MRNVALUE555,
      Email: emaill111,
    },
    UpdateExpression: `set First_Name = :First_Name, Last_Name = :LastName, Gender = :Gender,
     Date_of_birth = :Dateofbirth, Modality = :Modality, Description = :Description,
      Start_Date = :Start_Date, Study_Status=:Study_Status,Report = :Report,
       Total_Images = :Total_Images, Images_Paths = :Images_Paths`,
    ExpressionAttributeValues: {
      ":First_Name":firstnamee,
      ":LastName":lasttnamee,
      ":Gender":genderrr,
      ":Dateofbirth":DOB33,
      ":Modality":modalityyy,
      ":Description":descriptt,
      ":Start_Date":startdatee33,
      ":Study_Status":studystatusss,
      ":Report":reportttt,
      ":Total_Images":timagesdata,
      ":Images_Paths":imagespathsss
     

    },
  })
  .promise()
  .then(data => console.log(data))
  .catch(console.error)




})

///////////////////////////////////Upload report////////////
app.post('/UPDATEREPORTDATA', function(req, res){

  // const descriptionn = req.data.descriptionnn
  // //   res.send({imagePath: `/images/${result.Key}`})
  // const passwordvaluee = 
  // const pass222= passwordvaluee.substring(1)
  // const pass333 = pass222.replace(/\\/g,'')
  const PASSWORDVALUE444 = req.body.PasswordDATA


  const emailll = req.body.EMAILDATA

  // const mrn222 = JSON.stringify(mrnvaluee)
  // // const mrn333= mrn222.substring(3)
  // // const mrn444 = mrn333.replace(/\\/g,'')
  const MRNVALUE555 = req.body.MRNDATA
  // const email222= emailll.substring(1)
  // const email333 = email222.replace(/\\/g,'')
  const EMAILLL444 =req.body.EMAILDATA
  console.log(emailll)
  console.log(MRNVALUE555)
  console.log(PASSWORDVALUE444)

  docClient
  .update({
    TableName: "RadsDB",
    Key: {
      MRN : MRNVALUE555,
      Email: EMAILLL444,
    },
    UpdateExpression: `set Report = :Report`,
    ExpressionAttributeValues: {
      ":Report": PASSWORDVALUE444,
    },
  })
  .promise()
  .then(data => console.log(data))
  .catch(console.error)




})


app.listen(8080, () => console.log("listening on port 8080"))