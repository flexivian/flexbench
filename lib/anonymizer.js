const multiparty = require('multiparty');

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

//Text
function anonymizeText(text) {
    if (typeof text !== 'string') {
        return text;
    }
    text = text.replace(emailRegex, 'anonymized_email@example.com');
    text = text.replace(phoneRegex, '000-000-0000');
    text = text.replace(urlRegex, 'https://anonymized-url.com');
    text = text.replace(fullNameRegex, 'Anonymized Name');
    text = text.replace(singleNameRegex, (match, p1, offset, string) => {
        if (fullNameRegex.test(string.substring(offset - p1.length, offset + p1.length))) {
            return match;
        }
        return 'Anonymized Name';
    });
    text = text.replace(passwordRegex, 'anonymized_password');
    text = text.replace(/\bAnonymized Name Anonymized Name\b/g, 'Anonymized Name');
    return text;
}

//Object
function anonymizeObject(obj) {
    if (!anonymizationEnabled) {
        return obj;
    }

    try {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object') {
                    if (Array.isArray(obj[key])) {
                        obj[key] = obj[key].map(item => {
                            if (typeof item === 'object') {
                                return anonymizeObject(item);
                            } else {
                                return anonymizeText(item);
                            }
                        });
                    } else {
                        obj[key] = anonymizeObject(obj[key]);
                    }
                } else {
                    obj[key] = anonymizeField(key, obj[key]);
                }
            }
        }
    } catch (error) {
        console.error("Error during anonymization:", error);
    }

    return obj;
}

//address
function anonymizeField(key, value) {
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

    if (fieldsToAnonymize.hasOwnProperty(key)) {
        return fieldsToAnonymize[key];
    } else {
        return anonymizeText(value);
    }
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
    setAnonymization
};

