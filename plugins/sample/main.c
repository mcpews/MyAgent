#include <stdio.h>
#include <stdlib.h>

void init(){
printf("Plugin Sample: Hello World!\n\n");
}

void oninitdone(){
  printf("Init done\n\n");
}

void onclientconnected(){
  printf("client connected\n\n");
}

void onchat(char *msg){
  printf("Player chat: %s\n\n",msg);
}
