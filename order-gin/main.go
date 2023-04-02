package main

import (
	"fmt"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/gorm"
)

var gormDB *gorm.DB

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("🟥 Failed load ENV, err:", err)
		os.Exit(1)
	}

	dsn := fmt.Sprintf(
		"host=%v user=%v password=%v dbname=%v port=%v sslmode=disable TimeZone=Asia/Bangkok",
		os.Getenv("POSTGRES_HOST"),
		os.Getenv("POSTGRES_USERNAME"),
		os.Getenv("POSTGRES_PASSWORD"),
		os.Getenv("POSTGRES_DB"),
		os.Getenv("POSTGRES_PORT"),
	)
	gormDB = ConnectDB(dsn)
	InitRabbitMQConsumer(os.Getenv("RABBIT_MQ_URL"))

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
