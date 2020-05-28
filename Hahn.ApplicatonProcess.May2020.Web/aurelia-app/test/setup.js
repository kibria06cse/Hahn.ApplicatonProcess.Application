import { HTMLTestContext, TestContext, } from '@aurelia/testing';
import { JitHtmlBrowserConfiguration } from '@aurelia/jit-html-browser';
import { Reporter, } from '@aurelia/kernel';
Reporter.level = 4 /* error */;
function createBrowserTestContext() {
    return HTMLTestContext.create(JitHtmlBrowserConfiguration, window, UIEvent, Event, CustomEvent, Node, Element, HTMLElement, HTMLDivElement, Text, Comment, DOMParser, CSSStyleSheet, ShadowRoot);
}
function initializeBrowserTestContext() {
    TestContext.createHTMLTestContext = createBrowserTestContext;
    // Just trigger the HTMLDOM to be resolved once so it sets the DOM globals
    TestContext.createHTMLTestContext().dom.createElement('div');
}
initializeBrowserTestContext();
