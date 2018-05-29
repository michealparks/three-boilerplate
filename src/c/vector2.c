#include <stdlib.h>
#include <emscripten/emscripten.h>

typedef struct {
  int *x;
  int *y;
  size_t used;
  size_t size;
} Vector2Array;

typedef struct {
  int x;
  int y;
} Coordinate;

_Thread_local int i = 0;
_Thread_local Vector2Array Array;

void initArray (Vector2Array *a, size_t initialSize) {
  a->x = (int *)malloc(initialSize * sizeof(int));
  a->y = (int *)malloc(initialSize * sizeof(int));
  a->used = 0;
  a->size = initialSize;
}

void insertArray (Vector2Array *a, int x, int y) {
  if (a->used == a->size) {
    a->size *= 2;
    a->x = (int *)realloc(a->x, a->size * sizeof(int));
    a->y = (int *)realloc(a->y, a->size * sizeof(int));
  }

  int index = a->used++;

  a->x[index] = x;
  a->y[index] = y;
}

void freeArray (Vector2Array *a) {
  free(a->x);
  free(a->y);
  a->x = NULL;
  a->y = NULL;
  a->used = a->size = 0;
}

EMSCRIPTEN_KEEPALIVE
int Vector2_init (int x, int y) {
  insertArray(&Array, x || 0, y || 0);
  return ++i;
}

EMSCRIPTEN_KEEPALIVE 
int* Vector2_get (int i) {
  int position[2] = {Array.x[i], Array.y[i]};
  return position;
}

int main (int argc, char** argv) {
  initArray(&Array, 50);
  return 0;
}

