# css-classes
List CSS classes in text(s).

## Usage
```javascript
const cssClasses = require("css-classes");
```
### Unique
```javascript
    const arr = [".a {} .b {}", ".a {} .c {}"];
    cssClasses(arr) // => ["a", "b", "c"]
    cssClasses(arr, false) // => ["a", "b", "c"]
    
    const text = ".a {} .b {} .a {} .c {}";
    cssClasses(text) // => ["a", "b", "c"]
    cssClasses(text, false) // => ["a", "b", "c"]
```
### Include duplicates
```javascript
    const arr = [".a {} .b {}", ".a {} .c {}"];
    cssClasses(arr, true) // => ["a", "b", "a", "c"]
    
    const text = ".a {} .b {} .a {} .c {}";
    cssClasses(text, true) // => ["a", "b", "a", "c"]
```