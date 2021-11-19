import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-powershell',
  templateUrl: './powershell.component.html',
  styleUrls: ['./powershell.component.css']
})
export class PowershellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  snippet1 =
    `
Add-Type -AssemblyName System.Windows.Forms

$main_form = New-Object System.Windows.Forms.Form
$main_form.Text = "Reset AE Teachers Password" #form text

#height and width
$main_form.Width = 600
$main_form.Height = 400

$main_form.AutoSize = $true #autosize stretch the window

$Label = New-Object System.Windows.Forms.Label
$Label.Text = "AE Teachers"
$Label.Location  = New-Object System.Drawing.Point(0,10)
$Label.AutoSize = $true

$main_form.Controls.Add($Label)
$ComboBox = New-Object System.Windows.Forms.ComboBox
$ComboBox.Width = 200
$Users = Get-ADUser -filter * -SearchBase "OU=AE Teachers,DC=DOMAINCONTROLLERNAME,DC=org" -Properties SamAccountName
Foreach ($User in $Users)
{
$ComboBox.Items.Add($User.SamAccountName);
}
$ComboBox.Location  = New-Object System.Drawing.Point(80,10)
$main_form.Controls.Add($ComboBox)


$Label2 = New-Object System.Windows.Forms.Label
$Label2.Text = "Reset Password (Spartan1):"
$Label2.Location  = New-Object System.Drawing.Point(0,40)
$Label2.AutoSize = $true
$main_form.Controls.Add($Label2)


$Button = New-Object System.Windows.Forms.Button
$Button.Location = New-Object System.Drawing.Size(150,40)
$Button.Size = New-Object System.Drawing.Size(120,23)
$Button.Text = "Reset"
$main_form.Controls.Add($Button)

$Button.Add_Click(
{
    #dialogue box for confirmation
    $msgBoxInput =  [System.Windows.MessageBox]::Show('Are you sure you want to reset?','CONFIRM','YesNo')

    #perform switch decision on the msgBoxInput using the Yes and No options of the dialogue box
  switch  ($msgBoxInput) {

  'Yes' {#if yes, check if name is empty. If empty give error and do nothing. Else, reset password.

    if ( $null -eq $ComboBox.SelectedItem ) {[System.Windows.MessageBox]::Show('Name Cant be Empty.','Error','OK','Error')}
    else{
    $username = $ComboBox.SelectedItem
    Set-ADAccountPassword -Identity $username -Reset -NewPassword (ConvertTo-SecureString -AsPlainText "Spartan1" -Force)
    [System.Windows.MessageBox]::Show('Password has been reset to Spartan1.')
    }
  }

  'No' {#do nothing
  }
  }

})

#display form method
$main_form.ShowDialog()
    `

snippet2 =
  `
#Powershell script to create shortcuts using the .CreateShortcut() Method of new object.S

$TargetFile = "C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.EXE"
$ShortcutFile = "C:\\Users\\Public\\Desktop\\Word.lnk"
$WScriptShell = New-Object -ComObject WScript.Shell
$Shortcut = $WScriptShell.CreateShortcut($ShortcutFile)
$Shortcut.TargetPath = $TargetFile
$Shortcut.Save()

$TargetFile = "C:\\Program Files\\Microsoft Office\\root\\Office16\\EXCEL.EXE"
$ShortcutFile = "C:\\Users\\Public\\Desktop\\Excel.lnk"
$WScriptShell = New-Object -ComObject WScript.Shell
$Shortcut = $WScriptShell.CreateShortcut($ShortcutFile)
$Shortcut.TargetPath = $TargetFile
$Shortcut.Save()

$TargetFile = "C:\\Program Files\\Microsoft Office\\root\\Office16\\OUTLOOK.EXE"
$ShortcutFile = "C:\\Users\\Public\\Desktop\\Outlook.lnk"
$WScriptShell = New-Object -ComObject WScript.Shell
$Shortcut = $WScriptShell.CreateShortcut($ShortcutFile)
$Shortcut.TargetPath = $TargetFile
$Shortcut.Save()

$TargetFile = "C:\\Program Files\\Microsoft Office\\root\\Office16\\POWERPNT.EXE"
$ShortcutFile = "C:\\Users\\Public\\Desktop\\Powerpoint.lnk"
$WScriptShell = New-Object -ComObject WScript.Shell
$Shortcut = $WScriptShell.CreateShortcut($ShortcutFile)
$Shortcut.TargetPath = $TargetFile
$Shortcut.Save()
  `

  snippet3 =
    `
#Start PS process as admin and pass the code under as arguments.
$WID=[System.Security.Principal.WindowsIdentity]::GetCurrent();
$WIP=new-object System.Security.Principal.WindowsPrincipal($WID);
$adminRole=[System.Security.Principal.WindowsBuiltInRole]::Administrator;
If ($WIP.IsInRole($adminRole)){
}else {
  $newProcess = new-object System.Diagnostics.ProcessStartInfo 'PowerShell';
  $newProcess.Arguments = $myInvocation.MyCommand.Definition
  $newProcess.Verb = 'runas'
  [System.Diagnostics.Process]::Start($newProcess);Write-Host 'Prompting for Elevation'
  exit
}
#####################
# Add Scripts Below #
#####################
Write-Host 'ElevatedCodeRunsHere';

#two lines of code installs modules needed to work with DELL BIOS/DellSmbios and imports them.
Install-Module -Name DellBIOSProvider
Import-Module DellBIOSProvider

$IsPasswordSet = (Get-Item -Path DellSmbios:\\Security\\IsAdminPasswordSet).currentvalue;
If($IsPasswordSet -eq $true)
 {
  $oldBIOSpsswd = "H@rdw@r3"; #variable to hold first BIOS password.
  $oldBIOSpsswd2 = "H@rdw@re"; #second BIOS password to try.
  $oldBIOSpsswd3 = "Dorinda"; #third BIOS password to try.
  write-host "Password is configured";
  #set the admin password to nothing, and provide the old BIOS password to execute.
  try{
  Set-Item -Path DellSmbios:\\Security\\AdminPassword "" -Password $oldBIOSpsswd;
  }
  catch{
    try {
      Set-Item -Path DellSmbios:\\Security\\AdminPassword "" -Password $oldBIOSpsswd2;
      }
    catch{
           Set-Item -Path DellSmbios:\\Security\\AdminPassword "" -Password $oldBIOSpsswd3;
  }
 }

 }
Else
 {
  write-host "No BIOS password";
  #if no BIOS password, just display no password and continue with the rest of the script.

 }

#create new local user on the computer with username as "User" and no password.
$pass = "password"
New-LocalUser -Name "User" -Password (ConvertTo-SecureString -AsPlainText -Force $pass) -Verbose -UserMayNotChangePassword -PasswordNeverExpires -AccountNeverExpires

#add local user account to Admin group.
Add-LocalGroupMember -Group "Administrators" -Member "User" -Verbose

#------------------------------------------------------------------------------------------------------------------------------------
$DomainUser = "DOMAIN.org\\DOMAINUSER"
$ComputerName = [System.Net.DNS]::GetHostByName($Null).HostName
Remove-Computer -ComputerName $ComputerName -UnjoinDomainCredential $DomainUser -WorkgroupName "WORKGROUP" -PassThru -Verbose  #-Restart
    `

  snippet4 =
    `
<#
  CoinGecko API
  https://www.coingecko.com
  sample run: PS H:\\PS> .\\crypto.ps1 -Coins bitcoin,uniswap,dogecoin,tron,chiliz -Currency usd -Sort Name
  Note: $_ is a variable referring to the current variable in the pipline.
#>
[CmdletBinding()]
param (
    [Parameter(Position = 0, Mandatory = $True, ValueFromPipeline = $false)]
    [String[]] $Coins,
    [ValidateSet('aed','ars','aud','bch','bdt','bhd','bmd','bnb','brl','btc',
'cad','chf','clp','cny','czk','dkk','eos','eth','eur','gbp','hkd','huf',
'idr','ils','inr','jpy','krw','kwd','lkr','ltc','mmk','mxn','myr','nok',
'nzd','php','pkr','pln','rub','sar','sek','sgd','thb','try','twd',
'uah','usd','vef','vnd','xag','xau','xdr','xlm','xrp','zar')]
    [String] $Currency = 'usd',
    [ValidateSet('Symbol', 'ID', 'Name', 'Price', 'Rank', 'MarketCap')]
    [string] $Sort = 'Rank'
)
Foreach ($coin in $Coins) {
$IDS += ($coin.ToLower() + "%2C")
}
Try {
$uri = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=$Currency&ids=$IDS&order=market_cap_desc&per_page=100&page=1&sparkline=false"
$AllCryptosArray = (Invoke-WebRequest -uri $uri -UseBasicParsing).Content | ConvertFrom-Json
}
Catch {
#store exception message
$Exception = $_.Exception.Message
Write-Error "Cannot connect to the API error: $Exception"
break
}
$arrayObject = @()
ForEach ($coin in $Coins) {
$Crypto = $AllCryptosArray | Where-Object Id -eq $coin

If ($Crypto.Count -eq 0)
{
    Write-Output "No coin listed on the website or wrong coin name"
}
Else
{
$obj = $Crypto | Select-Object \`
@{ Name = 'Symbol' ; Expression = { $_.symbol } },\`
@{ Name = 'ID' ; Expression = { $_.id } },\`
@{ Name = 'Name' ; Expression = { $_.name } },\`
@{ Name = 'Price' ; Expression = { ($_.current_price).ToString("#,0.00") } },\`
@{ Name = 'Rank' ; Expression = { $_.market_cap_rank } }, \`
@{ Name = 'Market Cap' ; Expression = { ($_.market_cap).tostring("#,#") } }\`

$arrayObject += $obj
}}

$arrayObject | Sort-Object $Sort | Format-Table -AutoSize
    `
}
