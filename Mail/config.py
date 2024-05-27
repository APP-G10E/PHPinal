import os


def find_xampp():
    # List of possible disk drives
    drives = ['C:', 'D:', 'E:', 'F:']

    # Iterate through each drive
    for drive in drives:
        xampp_path = os.path.join(drive, 'xampp')
        if os.path.exists(xampp_path):
            return drive, xampp_path
    return None, None

def modify_php_ini():
    disc_name = find_xampp()[0]
    xampp_path = find_xampp()[1]
    if disc_name:
        php_ini_path = os.path.join(disc_name, 'xampp', 'php', 'php.ini')
        with open(php_ini_path, 'r') as file:
            php_ini_content = file.read()

        # Find the section to modify
        start_index = php_ini_content.find('[mail function]')
        end_index = php_ini_content.find('[ODBC]')

        # Modify the section
        if start_index != -1 and end_index != -1:
            modified_content = php_ini_content[:start_index]
            modified_content += """
[mail function]

; For Win32 only.
; https://php.net/smtp
SMTP=smtp.gmail.com
; https://php.net/smtp-port
smtp_port=587

; For Win32 only.
; https://php.net/sendmail-from
sendmail_from = jeonghan.bae.official@gmail.com
sendmail_path = "\\"{}:\\xampp\\sendmail\\sendmail.exe\\" -t -i"


; For Unix only.  You may supply arguments as well (default: "sendmail -t -i").
; https://php.net/sendmail-path
;sendmail_path =

; Force the addition of the specified parameters to be passed as extra parameters
; to the sendmail binary. These parameters will always replace the value of
; the 5th parameter to mail().
;mail.force_extra_parameters =

; Add X-PHP-Originating-Script: that will include uid of the script followed by the filename
mail.add_x_header=Off

; Use mixed LF and CRLF line separators to keep compatibility with some
; RFC 2822 non conformant MTA.
mail.mixed_lf_and_crlf=Off

; The path to a log file that will log all mail() calls. Log entries include
; the full path of the script, line number, To address and headers.
;mail.log =
; Log mail to syslog (Event Log on Windows).
;mail.log = syslog

""".format(disc_name)
            modified_content += php_ini_content[end_index:]

            # Write the modified content back to the file
            with open(php_ini_path, 'w') as file:
                file.write(modified_content)
            print("php.ini modified successfully!")
        else:
            print("Could not find the specified sections in php.ini.")
    else:
        print("XAMPP not found in any disk drive.")

def modify_sendmail_ini():
    disc_name, xampp_path = find_xampp()
    if disc_name and xampp_path:
        sendmail_ini_path = os.path.join(xampp_path, 'sendmail', 'sendmail.ini')
        if os.path.exists(sendmail_ini_path):
            with open(sendmail_ini_path, 'w') as file:
                file.write("""
; configuration for fake sendmail

; if this file doesn't exist, sendmail.exe will look for the settings in
; the registry, under HKLM\Software\Sendmail

[sendmail]

; you must change mail.mydomain.com to your smtp server,
; or to IIS's "pickup" directory.  (generally C:\Inetpub\mailroot\Pickup)
; emails delivered via IIS's pickup directory cause sendmail to
; run quicker, but you won't get error messages back to the calling
; application.

smtp_server=smtp.gmail.com

; smtp port (normally 25)

smtp_port= 587

; SMTPS (SSL) support
;   auto = use SSL for port 465, otherwise try to use TLS
;   ssl  = alway use SSL
;   tls  = always use TLS
;   none = never try to use SSL

smtp_ssl=auto

; the default domain for this server will be read from the registry
; this will be appended to email addresses when one isn't provided
; if you want to override the value in the registry, uncomment and modify

;default_domain=mydomain.com

; log smtp errors to error.log (defaults to same directory as sendmail.exe)
; uncomment to enable logging

error_logfile=error.log

; create debug log as debug.log (defaults to same directory as sendmail.exe)
; uncomment to enable debugging

;debug_logfile=debug.log

; if your smtp server requires authentication, modify the following two lines

auth_username=jeonghan.bae.official@gmail.com
auth_password=wyvtithlbgmvrhkh

; if your smtp server uses pop3 before smtp authentication, modify the
; following three lines.  do not enable unless it is required.

pop3_server=
pop3_username=
pop3_password=

; force the sender to always be the following email address
; this will only affect the "MAIL FROM" command, it won't modify
; the "From: " header of the message content

force_sender=jeonghan.bae.official@gmail.com

; force the sender to always be the following email address
; this will only affect the "RCTP TO" command, it won't modify
; the "To: " header of the message content

force_recipient=

; sendmail will use your hostname and your default_domain in the ehlo/helo
; smtp greeting.  you can manually set the ehlo/helo name if required

hostname=
""")
            print("sendmail.ini modified successfully!")
        else:
            print("sendmail.ini not found.")
    else:
        print("XAMPP not found in any disk drive.")

# Call the functions to modify php.ini and sendmail.ini
modify_php_ini()
modify_sendmail_ini()
