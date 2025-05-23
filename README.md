<p align="center">
  <a href="https://github.com/Forge-Panel" target="blank"><img src="https://raw.githubusercontent.com/Forge-Panel/.github/refs/heads/main/images/forge_logo_dark_bg.svg" width="512" alt="Forge Logo" /></a>
</p>
<h1 align="center">Forge-Fitness</h1>

<p align="center">Forge-Fitness is a module for your Forge installation. You can log your workouts, step counter, vitals and other health data to your Forge dashboard.</p>
<p align="center"><i>This repository is for the hybrid app made with Ionic + Vue 3</i></p>

<br />

## Installation

Forge Fitness is still in early development and not yet available for Android Play Store and iOS App Store.

<br />

## Documentation

### Frameworks
- [Ionic](https://ionicframework.com/)
- [Vue 3](https://vuejs.org/)

<br />

### Project setup
Prerequisites
- Node 18+ installed
- NPM installed

#### Setup development
1. Clone repository
```shell
git clone https://github.com/Forge-Panel/Fitness-App.git
```

2. Install dependencies
```shell
npm install
```

3. Run the project
```shell
npm run dev
```

<br />

### Android setup

Prerequisites
- Android Studio installed

#### Setup development

1. Generate Android build
```shell
npx cap copy && npx cap sync
```

2. Open Android Studio
```shell
npx cap open android
```

3. Run the project
```shell
npx cap run android
```

<br />

#### Deploy to play store

Please read the Ionic [Android Play Store Deployment](https://ionicframework.com/docs/deployment/play-store) guide.