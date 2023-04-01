package main

import (
	"fmt"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectDB(dsn string) *gorm.DB {
	db, err := gorm.Open(
		postgres.New(postgres.Config{
			DSN:                  dsn,
			PreferSimpleProtocol: true,
		}),
		&gorm.Config{},
	)
	if err != nil {
		fmt.Println("🟥 Failed to connect DB, err:", err)
		os.Exit(1)
	}

	err = db.AutoMigrate(Order{})
	if err != nil {
		fmt.Println("🟥 Failed to run auo-migration, err:", err)
		os.Exit(1)
	}
	return db
}
