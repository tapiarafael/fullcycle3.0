FROM golang:1.17 AS build

WORKDIR /usr/src/app
COPY ./main.go .
RUN go build -ldflags "-s -w" main.go

FROM scratch

COPY --from=build /usr/src/app .

CMD [ "./main" ]