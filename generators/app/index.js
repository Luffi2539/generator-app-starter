"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

const filesArray = [
  { src: "_README.md", dest: "README.md" },
  { src: ".gitignore" },
  { src: ".eslintrc" },
  { src: ".editorconfig" },
  { src: ".babelrc" },
  { src: "yarn.lock", dest: "yarn.lock"},
  { src: ".env"},
  { src: "_package.json", dest: "package.json"},
  { src: "jsconfig.json"},
  { src: "jestsetup.js"},
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
  {
    type: "confirm",
    name: "Redux",
    message: "Would you like to apply Redux?",
    default: true
  },
  {
    type: "confirm",
    name: "Saga",
    message: "Would you like to apply Redux-Saga?",
    default: true
  },
  {
    type: "confirm",
    name: "Firebase",
    message: "Would you like to apply Firebase?",
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

    if (this.answers.Redux) {
      filesArray.push(
        { src: "reduxOption/actionCreators/**", dest: "src/actionCreators/" },
        { src: "reduxOption/actionTypes/**", dest: "src/actionTypes/" },
        { src: "reduxOption/reducers/**", dest: "src/reducers/" },
        { src: "reduxOption/selectors/**", dest: "src/selectors/" },
        { src: "reduxOption/store/**", dest: "src/store/" },
        { src: "reduxOption/ModalsPortal/**", dest: "src/components/ModalsPortal/" },
        { src: "reduxOption/selector_FILE_UPLOADER.js", dest: "src/components/Forms/FileUploader/selector.js"},
        { src: "reduxOption/selector_HOME.js", dest: "src/pages/Home/selector.js"}
      )
    }

    if (this.answers.Saga) {
      filesArray.push(
        { src: "sagaOption/domains/**", dest: "src/domains/"},
        { src: "sagaOption/sagas/**", dest: "src/sagas/"},
        { src: "sagaOption/aws/aws_constants.js", dest: "src/constants/aws.js"},
        { src: "sagaOption/aws/aws_services.js", dest: "src/services/aws.js"},
      )
    }

    if (this.answers.Firebase) {
      filesArray.push(
        { src: "firebaseOption/fbConfig.js", dest: "src/config/fbConfig.js"},
      )
    }

    if (this.answers.Firebase && this.answers.Saga) {
      filesArray.push(
        { src: "firebaseOption/rsf.js", dest: "src/domains/firebase/rsf.js"},
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
