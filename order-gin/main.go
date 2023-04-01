package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/ping", PingPong)
	r.GET("/api/v1/orders", ListOrders)
	err := r.Run(":4002")
	if err != nil {
		fmt.Println("🟥 Failed to start Gin, err:", err)
		return
	}
}
