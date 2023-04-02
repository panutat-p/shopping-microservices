const amqp = require('amqp-connection-manager');

async function connectRabbitMQ() {
  const connection = amqp.connect(process.env.RABBIT_MQ_URL);
  connection.on('connect', function () {
    console.log('🟩 RabbitMQ Connected!');
  });
  connection.on('disconnect', function (err) {
    console.log('RabbitMQ Disconnected.', err.stack);
  });
  return connection.createChannel({
    setup: function (channel) {
      return channel;
    },
  });
}

module.exports = connectRabbitMQ;
