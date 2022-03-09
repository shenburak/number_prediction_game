# Number prediction game
Basically a set of programs that try to generate random numbers and guess numbers that each other generates, queue the numbers with RabbitMQ and add items to their score queues on correct guesses.

## Run

### On local

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

### With docker

Start
```
make start_with_docker
```

Stop
```
make stop_with_docker
```

### With kubernetes

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
