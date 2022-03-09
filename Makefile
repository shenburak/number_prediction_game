start: program
program:
	npm run program_a & npm run program_b

start_with_docker:
	docker-compose -f "docker-compose.yml" up -d --build
stop_with_docker:
	docker-compose -f "docker-compose.yml" down

build_image:
	docker build -t program_a .
	docker build -t program_b .

start_with_k8s:
	mkdir /mnt/wsl/rabbitmqdir
	mkdir /mnt/wsl/rabbitmqdir/rabbitmq-1
	mkdir /mnt/wsl/rabbitmqdir/rabbitmq-0
	kubectl apply -f .deploy/namespace.yml
	kubectl apply -f .deploy/rabbitmq/rbac.yml
	kubectl apply -f .deploy/rabbitmq/pvs.yml
	kubectl apply -f .deploy/rabbitmq/services.yml
	kubectl apply -f .deploy/rabbitmq/configmap.yml
	kubectl apply -f .deploy/rabbitmq/statefulset.yml
	kubectl apply -f .deploy/program/a.yml
	kubectl apply -f .deploy/program/b.yml
stop_with_k8s:
	rm -rf /mnt/wsl/rabbitmqdir
	kubectl delete -f .deploy/namespace.yml & make delete_pvs
delete_pvs:
	kubectl delete pv pv-data-vol-0
	kubectl delete pv pv-data-vol-1

get-all_k8s:
	kubectl get all --namespace=number-prediction-game
describe_rabbitmq_pod:
	kubectl describe pods rabbitmq-0 --namespace=number-prediction-game