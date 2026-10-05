# glide-mq.dev

Documentation website for [glide-mq](https://github.com/avifenesh/glide-mq), a high-performance message queue for Node.js on Valkey/Redis Streams.

## Website

**[glidemq.dev](https://glidemq.dev/)**

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fglidemq.dev%2F&label=docs&logo=vitepress)](https://glidemq.dev/)

## Preview

[![glide-mq docs preview](https://image.thum.io/get/width/1280/crop/800/https://glidemq.dev/)](https://glidemq.dev/)

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run docs:dev

# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
```

The committed API reference is generated from `glide-mq` v0.17.0. To regenerate it, check out that exact core tag in a sibling `../glide-mq` directory, install the core's dependencies, then run `npm run docs:gen`. Building the committed site with `npm run docs:build` needs no sibling checkout.

To compile the framework examples embedded in the site, install the dependencies in the sibling `glidemq-examples` repository, then run `npm run docs:check-examples`. Pass a different examples checkout with `npm run docs:check-examples -- /path/to/glidemq-examples`.

## License

Apache-2.0 © glide-mq contributors
