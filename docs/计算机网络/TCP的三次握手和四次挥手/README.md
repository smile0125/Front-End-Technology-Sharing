# TCP的三次握手和四次挥手

## 三次握手

- 第一次握手：客户端发送一个TCP的SYN包（syn=j）到服务器，并进入SYN_SEND状态，等待服务器确认；SYN：同步序列编号（Synchronize Sequence Numbers）。
- 第二次握手：服务器收到SYN包，必须确认客户的SYN（ack=j+1），同时自己也发送一个SYN包（syn=k），即SYN+ACK包，此时服务器进入SYN_RECV状态；
- 第三次握手：客户端收到服务器的SYN＋ACK包，向服务器发送确认包ACK(ack=k+1)，此包发送完毕，客户端和服务器进入ESTABLISHED（TCP连接成功）状态，完成三次握手。

## 四次挥手

- 第一次挥手：客户端发送一个FIN，用来关闭客户端到服务器端的数据传送，客户端进入FIN_WAIT_1状态；
- 第二次挥手：服务器收到FIN后，发送一个ACK给客户端，确认序号为收到序号+1（与SYN相同，一个FIN占用一个序号），服务器进入CLOSE_WAIT状态；
- 第三次挥手：服务器发送一个FIN，用来关闭服务器到客户端的数据传送，服务器进入LAST_ACK状态；
- 第四次挥手：客户端收到FIN后，客户端进入TIME_WAIT状态，接着发送一个ACK给服务器，确认序号为收到序号+1，服务器进入CLOSED状态，完成四次挥手。

## 为什么是三次握手

- 三次握手才能保证双方都有发送和接收的能力。
- 第一次握手：客户端发送一个TCP的SYN包，syn=j，seq=j，表示客户端打算连接的服务器的端口，以及初始序号x；SYN：同步序列编号（Synchronize Sequence Numbers）。
- 第二次握手：服务器收到SYN包，必须确认客户的SYN（ack=j+1），同时自己也发送一个SYN包（syn=k），即SYN+ACK包，seq=k，ack=j+1，服务器端选择一个初始序号x+1（seq=x+1），此序号就是seq=k的地方；SYN：同步序列编号（Synchronize Sequence Numbers）。
- 第三次握手：客户端收到服务器的SYN＋ACK包，向服务器发送确认包ACK(ack=k+1)，此包发送完毕，客户端和服务器进入ESTABLISHED（TCP连接成功）状态，完成三次握手。