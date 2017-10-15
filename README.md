# fusebox-riot-plugin

This is a [FuseBox](http://fuse-box.org/) plugin that compiles [Riot](http://riotjs.com/) tag files

## Basic usage

```javascript
const { RiotPlugin } = require('fusebox-riot-plugin')

const fuse = FuseBox.init({
  homeDir: 'src',
  output: 'dist/$name.bundle.js',
  plugins: [
    RiotPlugin()
  ]
})
```

## Usage with Babel

If you want to apply Babel transpilation after the compilation step you need to use the chaining feature of FuseBox. As a prerequisite you need to install `babel-core` and the individual presets/transformers needed.

The example given below adds es2015 features on top of Riot's built-in transpiler.

### Yarn
```
yarn add babel-core babel-preset-es2015-riot --dev
```

### NPM
```
npm install babel-core babel-preset-es2015-riot --save-dev
```

```javascript
const fuse = FuseBox.init({
  homeDir: 'src',
  output: 'dist/$name.bundle.js',
  plugins: [

    [
      RiotPlugin(),
      BabelPlugin({
        config: {
          presets: ['es2015-riot']
        }
      })
    ]

  ]
})
```

## Compiler options

It is also possible to specify plugin options which will be directly passed to the Riot compiler (see [Riot compiler options](https://github.com/riot/compiler/blob/master/doc/guide.md#compiler-options)).

Example:
```javascript
const fuse = FuseBox.init({
  homeDir: 'src',
  output: 'dist/$name.bundle.js',
  plugins: [
      RiotPlugin({
        compact: true,
        type: 'typescript'
      })
  ]
})
```