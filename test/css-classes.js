import test from "ava";
import cssClasses from "../";

test("only supports source as text or array", t => {
    t.throws(() => cssClasses(undefined), supportsOnlyError(undefined));
    t.throws(() => cssClasses(1), supportsOnlyError(1));
    t.throws(() => cssClasses({}), supportsOnlyError({}));
    t.ok(cssClasses(""));
    t.ok(cssClasses([]));
    t.ok(cssClasses([""]));
});

test("should split classes to array", t => {
    const text = ".class-1 {} .second_2 {} ._third .-fourth {}";
    t.is(cssClasses(text).length, 4);
});

test("should preserve class names", t => {
    const text = ".a-class {} .another-class {}";
    const expected = ["a-class", "another-class"];
    t.same(cssClasses(text), expected);
});

test("should locate delimiter", t => {
    const text = ".a-class.a-modifier {} .another-class:pseudo {}";    
    const expected = ["a-class", "a-modifier", "another-class"];
    t.same(cssClasses(text), expected);
});

test("should trim whitespace", t => {
    const className = "a-class";
    const text = `.${className}    
                 {}  `;
    t.is(cssClasses(text)[0], className);
});

test("should handle _ and - as part of class name", t => {
   const text = ".a-b_c {} .a--b__c {}";
   const expected = ["a-b_c", "a--b__c"];
   t.same(cssClasses(text), expected);
});

test("should not split string values", t => {
   const text = `.a-b_c {} .a--b__c
                 {} '.a' "
                 .b"`;
   const expected = ["a-b_c", "a--b__c"];
   t.same(cssClasses(text), expected);
});

test("should identify class hierarchies", t => {
   const text = ".b-e .b-e--m {} .b-e.m{}";
   const expected = ["b-e", "b-e--m", "m"];
   t.same(cssClasses(text), expected);
});

test("should accept arrays as source", t => {
   const text = [".first-file-class-1 {} .first-file-class-2 {}", '.second-file-class-1 {} .second-file-class-2 {}'];
   const expected = ["first-file-class-1", "first-file-class-2", "second-file-class-1", "second-file-class-2"];
   t.same(cssClasses(text), expected);
});

test("should default or explicit exclude duplicates", t => {
   const arr = [".a {} .b {}", ".a {} .c {}"];
   const expected = ["a", "b", "c"];
   t.same(cssClasses(arr), expected);
   t.same(cssClasses(arr, false), expected);
});

test("should explicit include duplicates", t => {
   const arr = [".a {} .b {}", ".a {} .c {}"];
   const expected = ["a", "b", "a", "c"];
   t.same(cssClasses(arr, true), expected);
});

function supportsOnlyError(type){
    return `Can only search text(s) (string|string[]). Source type '${typeof type}' is not supported.`;   
}