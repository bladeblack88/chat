# stanyhoi

A mobile messenger prototype built with Expo, React Native, TypeScript, and Expo Router.

## Current status

- Initial mobile project structure
- Russian chats home screen
- Search and unread-chat filter
- Android APK build profile (Expo EAS)
- Chat list currently uses sample data; real messaging and accounts are not connected yet

## Build an Android APK

This repository includes a GitHub Actions workflow at **Actions → Build stanyhoi APK**.

1. Create an Expo account at https://expo.dev/signup.
2. Create an access token in your Expo account settings: https://expo.dev/settings/access-tokens.
3. In this GitHub repository, open **Settings → Secrets and variables → Actions → New repository secret**.
4. Set the secret name to `EXPO_TOKEN` and paste your Expo access token as its value. Never put the token in a source file or send it in chat.
5. Open **Actions → Build stanyhoi APK → Run workflow**.
6. Wait for the job to finish. The build link will be shown in the workflow log and in your Expo account at https://expo.dev/.

The workflow builds an installable Android APK using the `preview` profile. EAS Build may ask for Android signing credentials the first time; allow Expo to generate and manage them.

## Project structure

```
src/app/
  _layout.tsx
  index.tsx
app.json
eas.json
package.json
tsconfig.json
```

The app is named **stanyhoi**. The GitHub repository is **chat**.
