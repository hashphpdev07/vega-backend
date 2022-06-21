
// import hbs from 'hbs';
// import i18n from '../config/i18n';

const { readFileSync } = require("fs");
const { handlebars } = require("hbs");

handlebars.registerHelper('concat', function () {
    return Array.prototype.slice.call(arguments, 0, -1).reduce((a, b) => {
        return a.toString() + b.toString();
    });
});

handlebars.registerHelper('stringify', function (str) {
    return JSON.stringify(str);
});

exports.parse = (template, data = {}) => {
    return new Promise(async (resolve) => {
        try {
            // page and pages can be used to display page number in PDF
            data.page = "{{page}}";
            data.pages = "{{pages}}";

            return resolve(handlebars.compile(readFileSync(`src/v1/views/${template}.hbs`, { encoding: 'UTF-8' }))(data));
        } catch (error) {
            throw new Error(error.message);
        }
    });
};
