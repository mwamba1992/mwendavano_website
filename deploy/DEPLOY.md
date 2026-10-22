# Deploying mwendavano.com

Static site, no build step. Served by nginx on the production VPS (84.247.178.93), next to the Dukani and Wafanyakazi apps.

1. **DNS:** A records `mwendavano.com` and `www.mwendavano.com` → `84.247.178.93`.
   Leave the existing `business.`, `store.` and `wafanyakazi.` records as they are.
2. **Upload** (from this folder on your Mac):
   ```bash
   rsync -az --delete --exclude .git --exclude deploy --exclude README.md ./ root@84.247.178.93:/var/www/mwendavano-website/
   ```
3. **nginx + HTTPS** (on the server, once):
   ```bash
   # copy the config up first: scp deploy/mwendavano.com.conf root@84.247.178.93:/etc/nginx/sites-available/mwendavano.com
   ln -s /etc/nginx/sites-available/mwendavano.com /etc/nginx/sites-enabled/
   nginx -t && systemctl reload nginx
   certbot --nginx -d mwendavano.com -d www.mwendavano.com --redirect
   ```
4. **Check after launch:** open https://mwendavano.com on a phone, scroll, swipe the app slider,
   and send a test message with the contact form (it should open WhatsApp to +255 789 947 608).
   Paste the link into WhatsApp to see the preview image.

Updates later: edit, then repeat step 2.
