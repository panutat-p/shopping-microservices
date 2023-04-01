package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"os"
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("🟥 Failed load ENV, err:", err)
		os.Exit(1)
	}

	gin.SetMode(os.Getenv("GIN_MODE"))
	r := gin.Default()
	r.GET("/ping", PingPong)
	r.GET("/api/v1/orders", ListOrders)

	err = r.Run(":" + os.Getenv("PORT"))
	if err != nil {
		fmt.Println("🟥 Failed to start Gin, err:", err)
		return
	}
}
