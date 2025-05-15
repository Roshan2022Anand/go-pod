package utils

import "math/rand"

func GenerateID(l int) string {
	aChar := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-@&$#"

	var id string

	for i := 0; i < l; i++ {
		j := rand.Intn(len(aChar))
		id += string(aChar[j])
	}

	return id
}
