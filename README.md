# Guess the Island

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Ensure you have the following installed on your system:

- `Docker Engine`
  - To install Docker Engine visit the official Docker Docs website: https://docs.docker.com/engine/install/ and download Docker Desktop for your operating system. Follow the setup instructions.

### Start the game

- Run Docker Desktop and ensure that Docker Engine is running.

- Create a new folder in the location where you want to download the game and then open that folder in terminal.

- Clone this repository using these commands in your terminal window:

```bash
git clone https://github.com/djukic03/guess-the-island
cd guess-the-island
```

- Run Docker Compose file
  - When you start the game for the first time run this command and wait for it to build the project and install all dependencies:

```bash
docker-compose up --build
```

- Every next time you want to start the game, run this command:

```bash
docker-compose up
```

After this command you will get the localhost link looking something like this: `http://localhost:4000` in your terminal window. Click on it and the app will open in your default browser.

- When you want to close the game run the following command in new terminal window in the same location (.../Your_Folder/guess-the-island):

```bash
docker-compose down
```

ENJOY!!!
