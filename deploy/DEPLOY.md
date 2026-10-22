# Deploying mwendavano.com

Static site, no build step. Served by nginx on the production VPS (84.247.178.93), next to dukanimauzo.com,
business., store. and wafanyakazi.mwendavano.com. DNS for `mwendavano.com` and `www.mwendavano.com` already points there.

Until this is installed, https://mwendavano.com falls through to the dukanimauzo.com server block (wrong certificate,
Dukani content), because nginx has no 443 server for this name.

## Install (on the server, as root)

```bash
git clone https://github.com/mwamba1992/mwendavano_website.git /var/www/mwendavano-website
certbot certonly --nginx -d mwendavano.com -d www.mwendavano.com     # certificate first; renews itself
cp /var/www/mwendavano-website/deploy/mwendavano.com.conf /etc/nginx/sites-available/mwendavano.com
ln -sf /etc/nginx/sites-available/mwendavano.com /etc/nginx/sites-enabled/mwendavano.com
nginx -t && systemctl reload nginx
```

## Updates

```bash
cd /var/www/mwendavano-website && git pull
# only when deploy/mwendavano.com.conf changed:
cp deploy/mwendavano.com.conf /etc/nginx/sites-available/mwendavano.com && nginx -t && systemctl reload nginx
```
(index.html is served with no-cache, so visitors get the new page straight away.)

## Check after launch

- https://mwendavano.com shows the Mwendavano site with a padlock (not Dukani).
- https://dukanimauzo.com still shows Dukani.
- On a phone: scroll, swipe the app slider, send a test message with the contact form (opens WhatsApp to +255 789 947 608).
- Paste the link into WhatsApp to see the preview image.
