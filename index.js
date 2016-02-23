/**
 * Array of CSS classes from text(s).
 * @param {(string|string[])} source - text source(s).
 * @param {bool} [includeDuplicates=false] - include duplicates in result.
 */
module.exports = (source, includeDuplicates) => {
    "use strict";
    
    if(typeof source !== "string" && !Array.isArray(source))
         throw new Error(`Can only search text(s) (string|string[]). Source type '${typeof source}' is not supported.`);
          
    const re = /\.([A-z-_][\w-]*)[\s\r\n]*(?=[\.\:{])/g;
    const matches = !includeDuplicates
                        ? new Set()
                        : (() => {
                            let arr = [];
                            arr.add = Array.prototype.push.bind(arr);
                            return arr; })();

    let match;
    while (match = re.exec(source))
        matches.add(match[1].trim());

    return Array.from(matches);
}