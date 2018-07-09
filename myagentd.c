#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <signal.h>

int cpid=0;

void hterm(int s){
kill(cpid,SIGTERM);
exit(0);
}

void main(){
printf("MyAgent Daemon\nOpening daemon...\n");
daemon(1,0);//myagentd will create daemon and exit with code 2.
//system("node myagent.js");
cpid=fork();
if(cpid==0){
execlp("node","node","myagent.js",NULL);
exit(50);//If ERROR
}
signal(SIGTERM,hterm);
while(1){
sleep(5);
}
}
