const { default: slugify } = require('slugify');
const { v4: uuid } = require('uuid')

// generates a unique string
String.uniqueId = function (isMoreUnique = true) {
    if (isMoreUnique) {
        return uuid().replace(/-/g, '') + uuid().replace(/-/g, '');
    }
    return uuid().replace(/-/g, '');
}

// generates a short unique string
String.uniqueIdShort = function () {
    return uuid().split('-')[0] + uuid().split('-')[0]
}

// Converts a string into slug
String.prototype.slugify = function (assignNumber = false) {
    const slug = slugify(this.toString(), { lower: true, trim: true, strict: true })
    if (assignNumber) {
        const parts = slug.split('-')
        const lastPart = Number(parts[parts.length - 1])
        if (isNaN(lastPart)) {
            parts.push(1)
        } else {
            parts.push(lastPart + 1)
        }
        return parts.join('-')
    }
    return slug
}