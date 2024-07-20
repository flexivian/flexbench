const multiparty = require('multiparty');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// load anonymizerConfig
const configPath = path.join(__dirname, 'anonymizerConfig.json');
const anonymizationConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})/g;
const fullNameRegex = /\b([A-Z][a-z]+ [A-Z][a-z]+)\b/g; 
const singleNameRegex = /\b([A-Z][a-z]+)\b/g; 
const addressRegex = /\b(\d{1,5}\s\w+(?:\s\w+)*(?:\s(Street|St|Avenue|Ave|Boulevard|Blvd|Road|Rd|Lane|Ln|Drive|Dr|Court|Ct|Circle|Cir))?)\b/g;
const phoneRegex = /(\+?\d{1,4}[\s-]?)?(\(?\d{3}\)?[\s-]?)?[\d\s-]{7,10}/g;
const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*/g;
const stateRegex = /\b[A-Z]{2}\b/g;
const zipRegex = /\b\d{5}(?:-\d{4})?\b/g;
const passwordRegex = /(?<=name="password"[\s\S]*?\r\n\r\n)([A-Za-z0-9]+[A-Za-z0-9]*|[A-Za-z0-9]*[A-Za-z0-9]+)/g;

//default
let anonymizationEnabled = true;
let manualMode = anonymizationConfig.manualMode;
let customAnonymizationRules = anonymizationConfig.customAnonymizationRules;

//functions
function anonymizeEmail(text) {
    return text.replace(emailRegex, 'anonymized_email@example.com');
}

function anonymizeFullName(text) {
    return text.replace(fullNameRegex, 'Anonymized Name');
}

function anonymizeSingleName(text) {
    return text.replace(singleNameRegex, (match, p1, offset, string) => {
        if (fullNameRegex.test(string.substring(offset - p1.length, offset + p1.length))) {
            return match;
        }
        return 'Anonymized Name';
    });
}

function anonymizeAddress(text) {
    return text.replace(addressRegex, 'Anonymized Address');
}

function anonymizePhone(text) {
    return text.replace(phoneRegex, '000-000-0000');
}

function anonymizeUrl(text) {
    return text.replace(urlRegex, 'https://anonymized-url.com');
}

function anonymizeState(text) {
    return text.replace(stateRegex, 'XX');
}

function anonymizeZip(text) {
    return text.replace(zipRegex, '00000');
}

function anonymizePassword(text) {
    return text.replace(passwordRegex, 'anonymized_password');
}

//apply manual mode
function applyManual(text, rules) {
    for (let rule of rules) {
        if (rule.type === 'regex') {
            const regex = new RegExp(rule.pattern, 'g');
            text = text.replace(regex, rule.replacement);
        }
    }
    return text;
}

//Text
function anonymizeText(text) {
    if (typeof text !== 'string') {
        return text;
    }

    if (manualMode) {
        return applyManual(text, customAnonymizationRules);
    }

    text = anonymizeEmail(text);
    test = anonymizeAddress(test);
    test = anonymizeState(test);
    test = anonymizeZip(test);
    text = anonymizePhone(text);
    text = anonymizeUrl(text);
    text = anonymizeFullName(text);
    text = anonymizeSingleName(text);
    text = anonymizePassword(text);
    text = text.replace(/\bAnonymized Name Anonymized Name\b/g, 'Anonymized Name');
    return text;
}

// URL-encoded strings
function anonymizeUrlEncoded(data) {
    const params = new URLSearchParams(data);
    const anonymizedParams = new URLSearchParams();

    for (let [key, value] of params.entries()) {
        anonymizedParams.set(key, anonymizeText(value));
    }

    return anonymizedParams.toString();
}

//Object
function anonymizeObject(obj) {
    if (!anonymizationEnabled) {
        return obj;
    }

    if (typeof obj === 'string') {
        return anonymizeText(obj);
    }

    const newObj = Array.isArray(obj) ? [] : {};

    try {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                  
                    newObj[key] = anonymizeObject(obj[key]);
                } else {
                 
                    newObj[key] = anonymizeField(key, obj[key]);
                }
            }
        }
    } catch (error) {
        console.error("Error during anonymization:", error);
    }

    return newObj;
}

//address
function anonymizeField(key, value) {
    const lowerKey = key.toLowerCase();
    const fieldsToAnonymize = {
        'street': 'Anonymized Address',
        'city': 'Anonymized Address',
        'country': 'Anonymized Address',
        'state': 'XX',
        'zip': '00000',
        'email': 'anonymized_email@example.com',
        'phone': '000-000-0000',
        'name': 'Anonymized Name',
        'password': 'anonymized_password'
    };

    for (let field in fieldsToAnonymize) {
        if (lowerKey.includes(field)) {
            return fieldsToAnonymize[field];
        }
    }

    return anonymizeText(value);
}

//html
function anonymizeHtml(htmlContent) {
    const $ = cheerio.load(htmlContent);

    $('h1').text('Anonymized Title');
    $('p').each((index, element) => {
        $(element).text(anonymizeText($(element).text()));
    });
    $('a').each((index, element) => {
        $(element).attr('href', 'https://anonymized-url.com');
        $(element).text('More information...');
    });

    return $.html();
}

//req filter
function anonymizeRequest(request) {
    if (request.headers) {
        for (let header in request.headers) {
            if (request.headers.hasOwnProperty(header)) {
                request.headers[header] = anonymizeText(request.headers[header]);
            }
        }
    }

    if (request.body) {
        request.body = anonymizeObject(request.body);
    }

    if (request.query) {
        request.query = anonymizeObject(request.query);
    }

    if (request.params) {
        request.params = anonymizeObject(request.params);
    }

    return request;
}


//res filter
function anonymizeResponse(response) {
    if (response.headers) {
        for (let header in response.headers) {
            if (response.headers.hasOwnProperty(header)) {
                response.headers[header] = anonymizeText(response.headers[header]);
            }
        }
    }

    if (response.body) {
        response.body = anonymizeObject(response.body);
    }

    return response;
}

//Form
function anonymizeFormData(req, callback) {
    if (!anonymizationEnabled) {
        return callback(null, req);
    }

    const form = new multiparty.Form();
    const fields = {};
    const files = {};

    form.on('field', (name, value) => {
        if (name === 'password') {
            fields[name] = 'anonymized_password';
        } else {
            fields[name] = anonymizeText(value);
        }
    });

    form.on('file', (name, file) => {
        files[name] = file;
    });

    form.on('close', () => {
        callback(null, { fields, files });
    });

    form.on('error', (err) => {
        callback(err, null);
    });

    form.parse(req);
}

//flag setter
function setAnonymization(enabled) {
    anonymizationEnabled = enabled;
}


module.exports = {
    anonymizeObject,
    anonymizeFormData,
    anonymizeText,
    anonymizeRequest,
    anonymizeResponse,
    anonymizeHtml,
    anonymizeUrlEncoded,
    setAnonymization
};

