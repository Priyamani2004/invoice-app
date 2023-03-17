const express=require('express')
const app=express();
const port=5132;
const database=require('mysql');
const bodyParser=require('body-parser');
const path=require('path');
const { url } = require('inspector');

let connection=database.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:'invoice'

});
app.use(express.static('public'));
app.set("view engine","ejs");
var urlencodedParser=bodyParser.urlencoded({extended:false});
app.set('views',path.join(__dirname,'views'));

app.use(bodyParser.json());
app.get('/index',(req,res)=>{
let sql=`SELECT * FROM invoicedetails`;
connection.query(sql,(err,result)=>{
    let data=result;
    const obj={
      csspath:"css/style.css",
      jspath:"js/script.js"
    }
    res.render("index",{data:data,obj});
  })
});

app.get('/delete',(req,res)=>{
res.render('delete');
});

app.get('/edit',(req,res)=>{
  res.render('edit');
});


 app.post('/addinvoice',urlencodedParser,(req,res)=>{
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var password = "";
 for (var i = 0; i <= 5; i++) {
   var randomNumber = Math.floor(Math.random() * chars.length);
   password += chars.substring(randomNumber, randomNumber +1);
 }

    let billfrom={
        "address":req.body.addname,
        "city":req.body.addcity,
        "postcode":req.body.addpost,
        "country":req.body.addcountry,
    };

    let column3=JSON.stringify(billfrom);
    
    let billto={
        "clientname":req.body.addclient,
        "clientemail":req.body.addEmail,
        "street":req.body.addstreet,
        "status":req.body.sendstaus,
    }

    let column4=JSON.stringify(billto);
   
    let customor={
        "customercity":req.body.addcity1,
        "customerpost":req.body.addpost2,
        "customercountry":req.body.addcountry3,
        "invoicedate":req.body.addpay,
        "payment":req.body.adddate,
        "project":req.body.addDescription,
    }
    let column5=JSON.stringify(customor);
   

    let listitem={
       "itemname":req.body.itemname,
       "qty":req.body.qtynum,
       "price":req.body.pricenum,
    }
    let column6=JSON.stringify(listitem);
    let column7=req.body.sendstaus;
    if(column6!="{}"){
     let values = [password,column3,column4,column5,column6,column7];
      let sql = `insert into invoicedetails(userid,billform,billto,useraddress,listitems,status) values(?,?,?,?,?,?)`;
   
      connection.query(sql,values,(err,resl)=>{
        if(err){
          console.log(err);
        } 
        
      })
    }
      res.redirect("/index");
    })

  app.post('/useraddress',urlencodedParser,(req,res)=>{
    let getid=req.body.getid;
    let sql=`SELECT * FROM invoicedetails WHERE id=${getid}`;
    connection.query(sql,(err,results)=>{
      let getaddress=results;
      res.render("detail",{getaddress:getaddress});
    })
  });

  app.post('/repeatindex',function(req,res){
    res.redirect("/index");
  });

  app.post('/markpaid',urlencodedParser,(req,res)=>{
    let setid=req.body.markaspaid;
    const columnValue = "paid";
    const sql = `UPDATE invoicedetails SET status='paid' WHERE id=${setid}`;
 connection.query(sql,(error, results) => {
  if (error){
    return console.error(error.message);
  }
  });
  let mysql=`SELECT * FROM invoicedetails WHERE id=${setid}`;
  connection.query(mysql,(err,results)=>{
    let getaddress=results;
    res.render("detail",{getaddress:getaddress});
  })
});

app.post('/editusers',urlencodedParser,(req,res)=>{
  let setid=req.body.SaveChanges;
    let billfrom={
        "address":req.body.addname,
        "city":req.body.addcity,
        "postcode":req.body.addpost,
        "country":req.body.addcountry,
    };

    let column3=JSON.stringify(billfrom);
    
    let billto={
        "clientname":req.body.addclient,
        "clientemail":req.body.addEmail,
        "street":req.body.addstreet,
    }

    let column4=JSON.stringify(billto);
   
    let customor={
        "customercity":req.body.addcity1,
        "customerpost":req.body.addpost2,
        "customercountry":req.body.addcountry3,
        "invoicedate":req.body.addpay,
        "payment":req.body.adddate,
        "project":req.body.addDescription,
    }
    let column5=JSON.stringify(customor);
   

    let listitem={
       "itemname":req.body.itemname,
       "qty":req.body.qtynum,
       "price":req.body.pricenum,
    }
    let column6=JSON.stringify(listitem);
    let column7=req.body.sendstaus;
      let sql= `UPDATE invoicedetails SET billform='${column3}',billto='${column4}',useraddress='${column5}',listitems='${column6}',status='${column7}' WHERE id=${setid}`;
      connection.query(sql,(err,res)=>{
        if(err){
          console.log(err);
        } 
      })
      let mysql=`SELECT * FROM invoicedetails WHERE id=${setid}`;
      connection.query(mysql,(err,results)=>{
        let getaddress=results;
        res.render("detail",{getaddress:getaddress});
      })
    });

    app.post('/deleterow',urlencodedParser,(req,res)=>{
      let getid=req.body.deleteid;
      let sql=`DELETE FROM invoicedetails WHERE id=${getid}`;
      connection.query(sql,(err,res)=>{
        if(err){
          console.log(err);
        } 
      })
      res.redirect("/index")
    })

app.listen(port,() =>console.log("listening server",port));