FROM golang

WORKDIR /usr/src/app

RUN apt update -y && \
    apt install -y protobuf-compiler && \
    apt install -y sqlite3

RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.28 && \
    go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.2 && \
    go install github.com/ktr0731/evans@latest