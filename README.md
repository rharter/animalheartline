# Animal Heartline Humane Association Website

This is the source for the AHL website.  It uses [Grunt](http://gruntjs.com/) to generate the site, along with [CoffeeScript](http://coffeescript.org/) and [Sass](http://sass-lang.com/).

# Building

To generate the static site, simply run `grunt build`. You will find the resulting static website in the `dist/` directory.

```
→ grunt build
Running "includereplace:dist" (includereplace) task
>> Processing src/index.html
>> Processed src/index.html
>> ...

Running "compass:dist" (compass) task

Running "coffee:app" (coffee) task
>> 1 files created.

Running "copy:images" (copy) task
Copied 6 files

Running "copy:javascript" (copy) task
Created 1 directory, copied 1 file

Done, without errors.
```

You can use the `--basedir` command line parameter to set a custom base directory for the site.

```
→ grunt build --basedir=animalheartline/
```


# Development

The grunt script support running a local server to serve the project, and will also listen for file changes and automatically build and refresh when changes are detected. The website will be available at [http://localhost:9009](http://localhost:9009) while running.

```
→ grunt serve
...

Running "connect:server" (connect) task
Started connect web server on http://localhost:9009

Running "watch" task
Waiting...
```

# Deploy to Github Pages

To share development version of the site, there is a script that will deploy it to the Github Pages url [http://rharter.github.io/animalheartline/](http://rharter.github.io/animalheartline/). You simply need to run the `deploy_dev.sh` script (on a Unix based computer) to generate and deploy the site.
