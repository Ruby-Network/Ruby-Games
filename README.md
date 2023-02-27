# Ruby Games

## Ruby Games is games website with a relatively clean and simple design.

## This is now Archived. We have merged this with [Ruby](https://github.com/ruby-network/ruby)

### The website is built using the following technologies:
- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- HTML
- CSS
- JavaScript

### Some of the features of the website include:
- A responsive design (soon)
-  ~43 Games
- Fast loading times
- A clean and simple design

### Self Hosting
- Clone the repository
- Install the dependencies using `yarn install`
- Build the website using `yarn build`
- Start the website using `yarn start`

### Self Hosting (Docker)
- You can use the example docker-compose.yml file to self host the website using docker
```yml
version: "2"
services:
  natant-games:
    restart: unless-stopped
    image: "ghcr.io/natant-network/natant-games:main"
    ports:
    #IMPORTANT: DO NOT CHANGE 3000 ONLY CHANGE THE NUMBER BEFORE THE COLON
      - your port here:3000
# network config if youi want a network config feel free to use the one below and change the name to your liking. YOU MUST RUN docker network create <your name> BEFORE RUNNING THE CONTAINER
#networks:
#  default:
#    external:
#      name: default
```
Or alternatively you can curl the docker compose file from the repository
```bash
curl -o docker-compose.yml https://github.com/Natant-Network/Natant-Games/raw/main/docker-compose.yml
```
- Run `docker-compose up -d` to start the container
- Run `docker-compose down` to stop the container

Using the Dockerfile
- Clone the repository
- Build the image using `docker build -t natant-games .`
- Run the container using `docker run -d -p your port here:3000 natant-games`

### Contributing
- Fork the repository
- Create a new branch
- Make your changes
- Create a pull request
To run the website locally you can use `yarn dev` to start the website in development mode

### License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details

### Credits
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Echo for some of the games](https://3kh0.github.io)

### Contact
- [Discord](https://dsc.gg/natantnetwork)

### Support
- Join the [Discord](https://dsc.gg/natantnetwork) to support the project
