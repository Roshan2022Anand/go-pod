package tests

import (
	"server/internal/utils"
	"testing"
)

// test the GenerateID function
func TestGenID(t *testing.T) {
	id := utils.GenerateID(10)

	if id == "" {
		t.Fatal("expected non-empty id")
	}

	if len(id) != 10 {
		t.Fatalf("expected id length 10, got %d", len(id))
	}

	t.Logf("Generated ID: %s", id)
}
