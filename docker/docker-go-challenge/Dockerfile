FROM golang:1.17 AS build

WORKDIR /usr/src/app
COPY ./main.go .
RUN go build main.go

# FROM alpine:latest
FROM gcr.io/distroless/static-debian12

COPY --from=build /usr/src/app .

CMD [ "./main" ]