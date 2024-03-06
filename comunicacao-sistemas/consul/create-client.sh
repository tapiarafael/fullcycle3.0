mkdir /etc/consul.d && mkdir /var/lib/consul
consul agent -bind=172.19.0.5 -data-dir=/var/lib/consul -config-dir=/etc/consul.d -retry-join=172.19.0.4 -retry-join=172.19.0.3

consul agent -bind=172.19.0.6 -data-dir=/var/lib/consul -config-dir=/etc/consul.d -retry-join=172.19.0.4 -retry-join=172.19.0.3

consul join [ANY_CONSUL_SERVER_IP]