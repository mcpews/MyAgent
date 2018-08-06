#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

void init(){
printf("MyAgentDaemon Loaded\n");
}

void oninitdone(){
printf("Creating daemon...\n");
  //freopen("/dev/null","w",stdout);
  daemon(1,0);
}
void onchat(char *str){}
void onclientconnected(){}
