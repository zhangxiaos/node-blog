var path = require('path');
var express = require('express');
var session = require('express-session'); // 会话支持
var MongoStore = require('connect-mongo')(session); // 将session存储于mongodb
var flash = require('connect-flash'); // 页面通知
var config = require('config-lite'); // 读取配置文件
var routes = require('./routes');
var pkg = require('./package');

var app = express();

app.set('views', path.join(__dirname, 'views')); // 设置模板目录
app.set('view engine', 'ejs'); // 设置模板引擎

app.use(express.static(path.join(__dirname, 'public'))); // 设置静态文件目录
// app.use(session({
// 	name: config.session.key, // 设置cookie中保存session id的字段名称
// 	secret: config.session.secret, // 通过设置secret来计算hash值并存放在cookie中，使产生的signedCookie防止篡改
// 	cookie: {
// 		maxAge: config.session.maxAge // 设置过期时间，过期后cookie中的session id自动删除
// 	},
// 	store: new MongoStore({
// 		url: config.mongodb // mongodb地址
// 	})
// }))

app.use(flash()); // flash基于session, 因此要放到session中间件之后加载

app.use(require('express-formidable') ({
	uploadDir: path.join(__dirname, 'public/img'),
	keepExtensions: true // 保修后缀
}))

app.locals.blog = {
	title: pkg.name,
	description: pkg.description
};
app.use(function(req, res, next) {
	// res.locals.user = req.session.user;
	// res.locals.success = req.flash('success').toString();
	// res.locals.error = req.flash('error').toString();
	next();
});
routes(app);

app.listen(config.port, function () {
	console.log(`${pkg.name} listening on port ${config.port}`);
});















