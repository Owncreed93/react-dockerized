# Set up instructions


## Start project
```bash
docker compose up --build -d
```

## Set permissions
- Go to your local project's directory
```bash
sudo chown -R <user> <project_directory>
```

## Access container
```bash
docker exec -it <container> sh
```

## Create vite project
```bash
yarn create vite
```

## Select project properties
- Enter <project_name>
- Select "react"
- Select "react + swc"

## Install dependencies
- Go inside project
```bash
cd 02-tic-tac-toe
```

- Install dependencies
```bash
yarn
```

## Modify vite.config.js
- Add "server" property to defineConfig 
```javascript
server: {
    host: true,
    port: 3000
}
```

```bash
yarn dev
```