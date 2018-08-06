#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

void init(){
printf("MyAgentDaemon Loaded\n");
}

void oninitdone(){
printf("Creating daemon...\n");sleep(3);
  daemon(0,0);
}
void onchat(char *str){}
void onclientconnected(){}
