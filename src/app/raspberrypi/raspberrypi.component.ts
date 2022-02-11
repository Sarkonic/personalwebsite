import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-raspberrypi',
  templateUrl: './raspberrypi.component.html',
  styleUrls: ['./raspberrypi.component.css']
})
export class RaspberrypiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  snippet1 =
    `
    1.) Run updates
          sudo apt update
          sudo apt upgrade

    2.) Create Public and Private folders and configure the Linux Access Control permissions
          sudo mkdir /home/shares
          sudo mkdir /home/shares/public
          sudo chown -R root:users /home/shares/public
          sudo chmod -R ug=rwx,o=rwx /home/shares/public

    3.) Install Samba --Samba is an Open Source re-implementation of SMB protocol used by Microsoft client/server. Samba
        allows windows clients to talk to linux servers without knowing it's a linux server.
          sudo apt install samba samba-common-bin

    4.) Edit the Samba config file using either nano or vim
          sudo nano /etc/samba/smb.conf

    5.) Look for the Authentication block: ##### Authentication #####

    6.) Under the Authentication block add:
          security = user

    7.) Find [homes] and change the read only variable from yes to no so we can write files to the NAS.

    8.) Next we add the params set for public. Create a [public] and add some rules like below:
           [public]
           comment = public storage
           path = /home/shares/public
           valid users = @users
           force group = users
           create mask = 0660
           directory mask = 0771
           read only = no

    9.) Restart Samba's service
           sudo /etc/init.d/smbd restart

    10.) Set the SMB user and password: this is the credential you will enter to access the drive when mapped. If you
         decide to port forward SFTP make sure this password is complex an d not easily guessable.
           sudo smbpasswd -a pi

    11.) Next we mount the storage device --you can add as many as you have usb ports. Use the lsblk command in the
         terminal to see what linux is naming the external laptop drive plugged in via usb. It should be sda1 or sda2.
         In my case it was sda2, so format it using ext4.
           umount /dev/sda2
           sudo mkfs.ext4 /dev/sda2

    12.) Now we create a directory and set the permissions
           sudo mkdir /home/shares/public/disk1
           sudo chown -R root:users /home/shares/public/disk1
           sudo chmod -R ug=rwx,o=rx /home/shares/public/disk1

    13.) Mount the disk on the folder
           sudo mount /dev/sda1 /home/shares/public/disk1

    14.) Set it so the storage disk can mount automatically when the pi starts up by editing fstab file
           sudo nano /etc/fstab
    `

}
