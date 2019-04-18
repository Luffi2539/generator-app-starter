"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

const filesArray = [
  { src: "README.md" },
  { src: ".gitignore" },
  { src: ".eslintrc" },
  { src: ".editorconfig" },
  { src: ".babelrc" },
  { src: "yarn.lock"},
  { src: ".env"},
  { src: "package.json"},
  { src: "jsconfig.json"},
  { src: "config/**", dest: "config/"},
  { src: "scripts/**", dest: "scripts/"},
  { src: "src/**", dest: "src/"},
  { src: "public/**", dest: "public"}
];

const prompts = [
  {
    type: "confirm",
    name: "Start",
    message: "Would you like to start?",
    default: true
  },
  {
    type: "confirm",
    name: "Storybook",
    message: "Would you like to apply Storybook?",
    default: true
  },

  {
    type: "confirm",
    name: "I18",
    message: "Would you like to apply Multilanguage?",
    default: true
  },
];

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the first-rate ${chalk.red(
          "generator-app-starter"
        )} generator!`
      )
    );



    return this.prompt(prompts).then(props => {
      this.answers = props
      this.data = Object.assign({}, this.answers)
    })
  }

  writing() {
    if (this.answers.Storybook) {
      filesArray.push(
        { src: "storybookOption/.storybook/**", dest: ".storybook/" },
        { src: "storybookOption/stories/**", dest: "src/stories"}
      )
    }

    if (this.answers.I18) {
      filesArray.push(
        { src: "i18Option/i18next.js", dest: "src/config/i18next.js" },
        { src: "i18Option/locales/**", dest: "src/locales"}
      )
    }

    filesArray.forEach(file => {
      if (file.noTemplating || file.src.indexOf(".png") !== -1) {
        return this.fs.copy(
          this.templatePath(file.src),
          this.destinationPath(file.dest || file.src || file)
        );
      }
      return this.fs.copyTpl(
        this.templatePath(file.src || file),
        this.destinationPath(file.dest || file.src || file),
        this.data
      );
    });
  }


  install() {
    this.installDependencies(
      {
        npm: false,
        bower: false,
        yarn: true
      }
    );
  }
};
