# Docker Notes

## Basic
- **Container**: A standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another.
- **Dockerfile**: A text document that contains all the commands a user could call on the command line to assemble an image.
- **Docker**: A platform for developing, shipping, and running applications.

## Dockerfile
- `FROM <image>`: Base image.
- `RUN <command>`: Run a command.
- `COPY <source> <destination>`: Copy files from the host to the container.
- `WORKDIR <path>`: Set the working directory.
- `CMD <command>`: Run a command when the container starts.
- `EXPOSE <port>`: Expose a port.
- `ENTRYPOINT <command>`: Run a command when the container starts.
> `CMD` and `ENTRYPOINT` are used to run a command when the container starts. `CMD` is used to run a command with arguments, while `ENTRYPOINT` is used to run a command without arguments. When using both, `CMD` is used as the default arguments for `ENTRYPOINT`. If you pass arguments to `docker run`, they will override `CMD`.

## Dockerhub
- **Dockerhub**: A cloud-based registry service that allows you to link to code repositories, build your images, test them, and store the images.
> Images are stored in repositories. The repository name is the same as the image name. The repository name is used to push and pull images from Dockerhub.
- `docker pull <image>`: Pull an image from Dockerhub.
- `docker push <image>`: Push an image to Dockerhub.
> In order to push an image to Dockerhub, you need to tag the image with your Dockerhub username. The tag is in the format of `<username>/<image>:<tag>`. The tag is optional, but it's recommended to use it. If you don't use a tag, the default tag is `latest`. Run `docker login` to login to Dockerhub.
> If an image is not used for a long time, it will be removed from Dockerhub. To prevent this, you need to run `docker pull <image>` to refresh the image.

## Commands
- `docker ps`: List running containers.
- `docker run <image>`: Run a container.
- `docker rm <container>`: Remove a container.
- `docker rm $(docker ps -a -q) -f`: Remove all containers.
- `docker attach <container>`: Attach to a running container that was ran using the `-d` flag.
- `docker exec -it <container> <command>`: Run a command in a running container.
- `docker logs <container>`: View logs of a container.

## Network
 ### Network Types
  - **Bridge**: Default network. Containers can talk to each other. _(Default)_
  - **Host**: Containers can talk to the host.
  - **None**: Containers can't talk to anything.
  - **Overlay**: Multi-host network.
  - **Macvlan**: Connects to physical network.

  ### Commands
  - `docker network ls`: List networks.
  - `docker network inspect <network>`: Inspect a network.
  - `docker network create --driver <driver> <network>`: Create a network.
  - `docker network connect <network> <container>`: Connect a container to a network.

  > When using a default network, the container name is **NOT** used as the hostname. In order to connect to a container, you need to use the container's IP address. To use the container name as the hostname, you need to create a custom network.

  > To access the host from a container, use `host.docker.internal` as the hostname.

## Multistage Build
 Use multiple `FROM` statements in a Dockerfile to create multiple images. The final image is the last `FROM` statement.
 This can be used to create a smaller image by using a smaller base image for the final image.
 > You can use an alias for the `FROM` statement to reference the previous `FROM` statement. The alias is in the format of `AS <alias>`.