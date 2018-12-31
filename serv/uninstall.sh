#! /bin/bash

if [ $(whoami) != "root" ]; then
	echo ROOT PERMISSION Plz.
	exit 1
fi

service myagent stop
if [ "$?" != "0" ]; then
	echo Unable to stop myagent service.
	exit 3
fi

ls /etc/systemd/system/multi-user.target.wants/myagent.service >/dev/null 2>/dev/null
if [ "$?" != "0" ]; then
	echo MyAgent service not installed.
	exit 0
fi

rm -rf /etc/systemd/system/multi-user.target.wants/myagent.service
if [ "$?" != "0" ]; then
	echo "[Fatal] Unable to remove service."
	exit 2
fi
systemctl daemon-reload
echo "All Done"
