docker run --rm -it -v "$PWD"/src:/app/src -v "$PWD"/vitest.config.ts:/app/vitest.config.ts green-surf-vrt /bin/bash


xvfb-run --auto-servernum --server-args='-screen 0 1920x1080x24 -dpi 192' npm run test-vrt-docker-watch


npx vitest src/stories/button.component.spec.ts --browser.headless --reporter verbose --reporter html --update=false

