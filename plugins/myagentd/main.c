#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

void init(){

}

void oninitdone(){
printf("MyAgentD Loaded.\nCreating daemon...\n");
  daemon(0,0);
}
void onchat(char *str){}
void onclientconnected(){}
