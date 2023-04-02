package main

import (
	"fmt"
	"os"

	amqp "github.com/rabbitmq/amqp091-go"
)

func InitRabbitMQConsumer(url string) {
	conn, err := amqp.Dial(url)
	defer conn.Close()
	if err != nil {
		fmt.Println("🟥 Failed to connect RabbitMQ, err:", err)
		os.Exit(1)
	}

	ch, err := conn.Channel()
	defer ch.Close()
	if err != nil {
		fmt.Println("🟥 Failed to connect RabbitMQ, err:", err)
		os.Exit(1)
	}

	msg, err := ch.Consume(
		"q.p.order.service",
		"",
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		fmt.Println("🟥 Failed to connect RabbitMQ, err:", err)
		os.Exit(1)
	}

	var forever chan struct{}

	go func() {
		for d := range msg {
			fmt.Printf("Received a message: %s\n", d.Body)
			fmt.Println("Done")
			//err := d.Ack(true)
			//if err != nil {
			//	fmt.Println("🟧 Failed to ACK")
			//	return
			//}
		}
	}()

	fmt.Printf("Waiting for messages\n")
	<-forever
}
