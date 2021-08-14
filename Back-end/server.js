const fastify = require('fastify')({ logger: true });
const nodemailer = require("nodemailer");
//Registra el settings en variables de entorno para ser usadas globalmente
require('dotenv').config();

//Swagger
fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/swagger',
  swagger: {
    info: { title: 'TesisLuceroJS' }
  }
})

//Registrar CORS
fastify.register(require('fastify-cors'), { 
    origin: "*",
    methods: ["POST", "GET"]
})
//Register rate limit (cuantas solicitudes por ip)
fastify.register(require('fastify-rate-limit'), {
  max: 100,
  timeWindow: '1 minute'
})

/*//Register routes
fastify.register(require('./routes/administrator/administrator'));*/

//Register prefix
fastify.register(require('./routes/administrator/administrator'), { prefix: 'api/v1' });
fastify.register(require('./routes/users/users'), { prefix: 'api/v1' });


//Run Server (ir al .env para cambiar el puerto)
const start = async () => {
  try {
     fastify.listen(process.env.PORT, '0.0.0.0');
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start();


const other = async () => {
// Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "127.0.0.1",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'alice@example.com', // generated ethereal user
      pass: 'secretpassword', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "oscar.272731@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


//other().catch(e => { console.log('Error de este', e)});