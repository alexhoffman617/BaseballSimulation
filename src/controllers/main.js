var locals = {}

exports.index = function(req, res){
  locals.message = 'Server Working...'
  res.render('main/index', locals);
}