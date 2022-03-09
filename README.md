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
npm run program_a
```

Run program_b
```
npm run program_b
```

Monitor queues at http://localhost:15672/#/queues

### <a name="run-with-docker"></a> With docker

Start (it will take about 30 seconds for everything to start)
```
make start_with_docker
```

Stop
```
make stop_with_docker
```

Monitor queues at http://localhost:15672/#/queues

### <a name="run-with-kubernetes"></a> With kubernetes

- Since .deploy/rabbitmq/stateful.yml uses the local-storage storage class for permanent file storage, in the nodeAffinity definitions in the .deploy/rabbitmq/pvs.yml file, the existing node name must be entered in values and an existing file location in local, path. (In this example, docker-desktop application running with wsl on windows machine is used)
  - For example, can create the default path in the example with the following commands
    - ``mkdir /mnt/wsl/rabbitmqdir``
  	- ``mkdir /mnt/wsl/rabbitmqdir/rabbitmq-0`` this path is used in pvs.yml as /run/desktop/mnt/host/wsl/rabbitmq-dir/rabbitmq-0
  	- ``mkdir /mnt/wsl/rabbitmqdir/rabbitmq-1`` this path is used in pvs.yml as /run/desktop/mnt/host/wsl/rabbitmq-dir/rabbitmq-1

Build program images
```
make build_image
```

Start (it will take about 2-3 minute for everything to start)
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