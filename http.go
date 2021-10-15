package main

import  (
	"log"
	"net/http"
	handler "app-client/handler"
)

func main() {
	router := handler.NewRouter()

	router.ServeFiles("/static/*filepath", http.Dir("public"))

	router.Get("/", handler.Handler{H:handler.Index})
	println("Running on localhost:8001")
	log.Fatal(http.ListenAndServe(":8001", router))
}