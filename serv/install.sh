#! /bin/bash

cd serv
if [ $(whoami) != "root" ]; then
	echo Please run as root permission.
	exit 2
fi

systemd -v 2>/dev/null
if [ "$?" != "1" ]; then
	if [ "$1" != "-f" ]; then
		echo "It seem as you aren't installed systemd."
		echo ERROR: MyAgent Service only works with systemd.
		echo "If you're sure you installed systemd,run me with '-f' option."
		exit 3
	else
		echo "WARNING: Systemd check not passed."
		printf "Continue install? [Y/n]:"
		read option
		if [ "$option" == "Y" ] || [ "$option" == "y"]; then
			echo "ok,I'll continue install."
		else
			echo "You choosed 'n' or a invalid option."
			echo Abort.
			exit 3
		fi
	fi
fi

echo Install started.
ls /etc/systemd/system/multi-user.target.wants >/dev/null 2>/dev/null
if [ "$?" != "0" ]; then
	echo "[ERROR] Fatal: can not access systemd services directory."
	exit 4
fi

cp myagent.service /etc/systemd/system/multi-user.target.wants/
if [ "$?" != "0" ]; then
	echo "====Fatal Error====->Copy failed,code: $?"
	exit 5
fi
systemctl daemon-reload
if [ "$?" != "0" ]; then
	echo "====Fatal Error====->Daemon reload failed,code: $?"
	exit 6
fi
service myagent start
if [ "$?" != "0" ]; then
	echo "Fatal,unable to start service,code:$?"
	exit 7
fi
echo "Done."
