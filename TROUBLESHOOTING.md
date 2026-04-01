# Troubleshooting Guide - Princess Voyage

## 🐛 Chrome "Error" Message Fix

If you're seeing a generic "Error" message in Chrome when trying to create an account:

### Step 1: Open Developer Console
1. Press **F12** on your keyboard (or right-click → Inspect)
2. Go to the **Console** tab
3. Try creating an account again
4. Look for red error messages in the console

### Step 2: Check the Error Message
Common errors and solutions:

**Error: "Erreur 404: Not Found"**
- The server is not running or the API endpoint is wrong
- Solution: Restart the server with `npm start`

**Error: "Cannot reach server"**
- Your phone/browser cannot connect to the server
- Solution: Make sure you're using the correct IP address (see below)

**Error: "Utilisateur déjà enregistré"**
- This account already exists
- Solution: Try logging in instead, or use a different phone number

**Error: "Impossible de se connecter au serveur"**
- Network connection issue
- Solution: Check your internet connection and firewall

### Step 3: Test the API (Debug Page)
Go to: **http://localhost:3000/debug.html**

Or from your phone: **http://YOUR_COMPUTER_IP:3000/debug.html**

Click "Test Connection" and "Test Signup API" buttons to verify everything works.

---

## 📱 Accessing from Your Phone

### Finding Your Computer's IP Address

**On Windows:**
1. Open Command Prompt (cmd)
2. Type: `ipconfig`
3. Look for "IPv4 Address" (usually starts with 192.168 or 10.)
4. Example: `192.168.1.100`

### Accessing the App from Phone

1. Make sure your phone is on the **same WiFi network** as your computer
2. Open Chrome on your phone
3. Type in address bar: `http://192.168.1.100:3000` (replace with your actual IP)
4. Press Enter

You should see the Princess Voyage home page!

---

## 🔧 Common Issues

### Issue: "Cannot reach server" on phone

**Causes:**
- Phone is not on the same WiFi network
- Firewall is blocking port 3000
- Wrong IP address
- Server is not running

**Solutions:**
1. Verify server is running: `npm start` in the terminal
2. Check IP address: Run `ipconfig` on Windows
3. Check firewall: Allow Node.js through Windows Firewall
4. Test from computer first: Go to `http://localhost:3000`

### Issue: Creating account but not redirecting to index.html

**Causes:**
- API request failed silently
- Local storage not working
- Browser security settings

**Solutions:**
1. Open DevTools (F12) and check Console for errors
2. Go to Debug page and test the signup API
3. Clear browser cache: Ctrl+Shift+Delete
4. Try in Incognito/Private mode

### Issue: Seeing duplicate signup/login forms

**Explanation:**
- The index.html has inline signup/login forms for users trying to book without logging in
- When you click "Sign Up", it takes you to signup.html (the full page version)
- This is by design - not an error

**To use:**
- Go to `http://localhost:3000` → Booking home page
- If not logged in, inline forms appear
- Click "Inscrivez-vous ici" to go to full signup.html page

---

## 🧪 Testing the API Manually

### Test Signup (using Chrome Console)

```javascript
fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: 'John Doe',
        phone: '+237123456789',
        password: 'password123'
    })
}).then(r => r.json()).then(d => console.log(d))
```

### Test Login

```javascript
fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        phone: '+237123456789',
        password: 'password123'
    })
}).then(r => r.json()).then(d => console.log(d))
```

---

## 📋 Checklist

Before troubleshooting, verify:
- [ ] Server is running: `npm start`
- [ ] Terminal shows "Server running at http://localhost:3000"
- [ ] Can access http://localhost:3000 on your computer
- [ ] Database file exists: `busapp.db` (auto-created)
- [ ] Node.js is installed: `node --version`
- [ ] Dependencies installed: `npm install`

---

## 🚀 Quick Start (Phone Access)

```bash
# 1. Start server
npm start

# 2. Get computer IP (Windows)
ipconfig

# 3. On phone, visit:
http://192.168.1.100:3000
(replace 192.168.1.100 with your actual IP)
```

---

## 💬 For Detailed Debugging

1. Check server logs in the terminal - they show all API requests
2. Open debug page: http://localhost:3000/debug.html
3. Test each button to verify server connection
4. Open browser DevTools (F12) → Console tab
5. Try creating account and watch the console log messages

**All problems should show a detailed error message in the Console now!** 

Let me know what error message you see and I can help fix it.
