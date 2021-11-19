import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sccm',
  templateUrl: './sccm.component.html',
  styleUrls: ['./sccm.component.css']
})
export class SccmComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  snippet1 =
    `
If nothing is seen in appenforce.log, then the client probably hasn't gotten the policy and may not even be communicating with the site.

You need to make sure the client is communicating successfully first and then review your application to make sure there's nothing wrong with it.



You can deploy images in SCCM by capturing an image on a fresh machine (updates, uninstall everything so sysprep is happy). Don't worry about applications.

can be installed as part of the task sequence and can be selected per image made. NEED YOUR OWN SUBNET FOR THIS. Below are some useful links for reference.

https://tamilkovan.com/2019/09/29/windows-10-deployment-using-sccm-1902-osd-step-by-step-guide/

https://www.prajwaldesai.com/how-to-deploy-windows-10-enterprise-using-sccm/

https://systemcenterdudes.com/sccm-windows-10-build-and-capture-task-sequence/
I ended up using a thinimage instead and deploying applications through task sequences: it went a lot easier than sifting through bloatware for sysprep to be happy.

Had to go to DHCP server and set the scope for the subnet (66 and 67 needed to be configured).

to setup WDS: https://www.prajwaldesai.com/installing-and-configuring-windows-deployment-services/

WDS is what holds the images.



-Inplace upgrades can be done as well:

you can specify with the upgrade package a product key, if updates are wanted, and if you want any applications to be installed. It's pretty neat..

https://www.prajwaldesai.com/in-place-upgrade-to-windows-10-enterprise-with-sccm/

https://systemcenterdudes.com/sccm-windows10-21h1-upgrade/

the systemcenterdudes link was most helpful. It will take a while for it to be pushed out to the target. When updating from windows to windows, a wim image file

is NOT needed (Make task sequence through OS Upgrade Package). If the computer does not have windows, you need to import an OS image.



Speeding up Task Sequence/OSD:

https://sccmf12twice.com/2018/03/reduce-osd-time/



Increasing Client Cache size without a script:

https://www.prajwal.org/configure-sccm-client-cache-settings/

cache size by default is 5 GB.



If WDS fails (or any issues with imaging) restart the WDS service. RDP into SCCM and go to services and restart Windows Deployment Server Service (or something similar like that).



IF YOU WANT TO REIMAGE A COMPUTER you must obtain its MAC address, search in Devices, and DELETE. If it is in there, it isn't

part of the Unknown Computers group which the task sequence is deployed to. It will not grab the task sequence unless it is unknown through DHCP.



What bootfile to use for DHCP scope port 67:

You should use the bootfile wdsnbp.com. It's kind of clever and decides which of the other files it calls based on criteria like if there is a mandatory advertisement for the computer, bootimage pxeboot.n12 is called. If there is no advertisement for the computer, abortpxe.com is called.

The path that should be defined in dhcp is "smsboot\x86\\wdsnbp.com"



POWERSHELL SCRIPT: copy office shortcuts to public desktop

https://dotnet-helpers.com/powershell/create-shortcuts-on-desktops-using-powershell/ (too complicated, does not work in task sequence.)

For one that is simple and task sequence friendly just use Copy-Item cmdlet:

https://community.spiceworks.com/topic/2177654-microsoft-office-icons



CREATING PACKAGE WITH POWERSHELL SCRIPT:

https://www.windows-noob.com/forums/topic/14170-how-can-i-display-custom-messages-in-a-task-sequence-using-powershell-in-system-center-configuration-manager-current-branch/

https://docs.recastsoftware.com/ConfigMgr-Docs/TaskSequence/SCCM_TaskSequence_Step_RunPowerShellScript.html



Powershell scripts can be placed in Task Sequence and ran in a SYSTEM context (just set it to bypass and paste the script in the task sequence step). Make sure

powershell is enabled in the boot image. Also make sure you have the powershell scripts running under YOUR account (or any other domain admin account) for them to work

in the task sequence. Scripts that run under system might need elevated permissions to work.



Create office 2019 package:

https://systemcenterdudes.com/sccm-office-2019-deployment/



ALWAYS SEND EVERYTHING TO THE DISTRIBUTION POINT!!! such as packages, applications, etc.

Also make sure the application in properties has set the option "allow this application to be installed from the Install Application task sequence action without being

deployed" This is important or it wont be grabbed by the task sequence.



SCCM Reporting Services: Used for creating reports in sccm.

https://systemcenterdudes.com/install-sccm-2012-reporting-services-point/

https://systemcenterdudes.com/sccm-report-creation-report-builder/



Setting up SQL 2019 on SCCM:

https://www.prajwaldesai.com/install-sql-server-2019-for-configmgr/

 `

}
