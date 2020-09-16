
 //middleware function costumize can perform some operation just before to send the request to the handler if you don't use next wont go ahead 
 app.use((req, res, next) =>{
  if(req.method === "GET"){
    res.send({error: "request not allowed at the moment "})
  } else {
    next()
  }
  })
  
  ///example when the site is down
  
  app.use((req, res, next) =>{
    res.status(503).send({Message: "Sorry the website is under maintenance at the moment try later"})
  })