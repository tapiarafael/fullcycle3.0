mkdir /etc/consul.d && mkdir /var/lib/consul
consul agent -server -bootstrap-expect=3 -node=consul-server01 -bind=172.19.0.2 -data-dir=/var/lib/consul -config-dir=/etc/consul.d

consul agent -server -bootstrap-expect=3 -node=consul-server02 -bind=172.19.0.3 -data-dir=/var/lib/consul -config-dir=/etc/consul.d

consul agent -server -bootstrap-expect=3 -node=consul-server03 -bind=172.19.0.4 -data-dir=/var/lib/consul -config-dir=/etc/consul.d

consul join 172.19.0.3

consul agent -config-dir=/etc/consul.d