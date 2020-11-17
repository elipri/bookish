const logging = (req,res, next) => {
    console.log(req.headers);
    console.log(new Date(), req.url/*, req.body.email*/); //ükskõik mis päring tuleb, logi päringu aeg ja teekond
    next();
  }

  module.exports = logging;