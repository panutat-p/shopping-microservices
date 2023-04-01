package main

import (
	"fmt"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("🟥 Failed load ENV, err:", err)
		os.Exit(1)
	}

	gin.SetMode(os.Getenv("GIN_MODE"))
	r := gin.Default()
	r.Use(cors.Default()) // allow all
	InitRoutes(r)

	err = r.Run(":" + os.Getenv("PORT"))
	if err != nil {
		fmt.Println("🟥 Failed to start Gin, err:", err)
		return
	}
}
