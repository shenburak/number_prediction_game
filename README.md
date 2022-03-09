# Number prediction game
Basically a set of programs that try to generate random numbers and guess numbers that each other generates, queue the numbers with RabbitMQ and add items to their score queues on correct guesses.

# Contents
  - [Run](#-run)
    - [On local](#-on-local)
    - [With docker](#-with-docker)
    - [With kubernetes](#-with-kubernetes)
  - [FAQ](#-faq)
    - [Verbose option](#-verbose-option)
    - [RabbitMQ link address](#-rabbitmq-link-address)
## <a name="run"></a> Run

### <a name="run-on-local"></a> On local

- Requires a RabbitMQ running on the machine.

Download the packages
```
npm i
```

Run program_a
```
npm i run program_a
```

Run program_b
```
npm run program_b
```

Monitor queues at http://localhost:15672/#/queues

### <a name="run-with-docker"></a> With docker

Start
```
make start_with_docker
```

Stop
```
make stop_with_docker
```

Monitor queues at http://localhost:15672/#/queues

### <a name="run-with-kubernetes"></a> With kubernetes

Build program images
```
make build_image
```

Start
```
make start_with_k8s
```

Stop
```
make stop_with_k8s
```

Monitor queues at http://localhost:31672/#/queues

## <a name="faq"></a> FAQ

### <a name="faq-verbose-option"></a> Verbose option
Delete the VERRBOSE value in the .env to close the logs

### <a name="faq-rabbitmq-link-address"></a> RabbitMQ link address
By default, programs look for the RabbitMQ program running at localhost; however, this can change by defining the AMQP_RECEIVE_URL key in the .env file.